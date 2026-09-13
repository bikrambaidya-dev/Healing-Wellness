// Demo-only local video storage: admin-uploaded reel files are kept in this
// browser's IndexedDB (not localStorage — video blobs are too large for that
// quota) and served back as object URLs. No backend, so uploads only ever
// appear on the device that uploaded them.
const DB_NAME = "serenity-reels";
const STORE_NAME = "media";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function putReelMedia(id: string, blob: Blob): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function getReelMediaBlob(id: string): Promise<Blob | null> {
  const db = await openDB();
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve((request.result as Blob | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return blob;
}

export async function deleteReelMedia(id: string): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  urlCache.delete(id);
}

const urlCache = new Map<string, string>();

export async function getReelMediaUrl(id: string): Promise<string | null> {
  const cached = urlCache.get(id);
  if (cached) return cached;
  const blob = await getReelMediaBlob(id);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}

export function generateMediaId() {
  return `media-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Captures a frame from a local video file to use as its poster thumbnail. */
export function captureVideoPoster(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      video.currentTime = Math.min(0.5, (video.duration || 1) / 4);
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 720;
      canvas.height = video.videoHeight || 1280;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(video.src);
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
      URL.revokeObjectURL(video.src);
      resolve(dataUrl);
    };

    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error("Could not read video file"));
    };
  });
}
