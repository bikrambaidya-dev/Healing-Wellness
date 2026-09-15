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
