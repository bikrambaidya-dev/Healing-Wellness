"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ADMIN_PAGE_SIZE = 8;

export function paginate<T>(list: T[], page: number, pageSize: number = ADMIN_PAGE_SIZE): T[] {
  return list.slice((page - 1) * pageSize, page * pageSize);
}

export function totalPagesFor(count: number, pageSize: number = ADMIN_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(count / pageSize));
}

/** Keeps `page` in range as the underlying list shrinks (e.g. after a delete empties the last page). */
export function useClampToTotalPages(page: number, setPage: (page: number) => void, totalPages: number) {
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages, setPage]);
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  itemLabel = "item",
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemLabel?: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-plum/10 pt-4">
      <p className="text-sm text-plum-soft">
        Page {page} of {totalPages} &middot; {totalItems} {itemLabel}
        {totalItems === 1 ? "" : "s"}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="flex size-9 items-center justify-center rounded-full border border-plum/15 text-plum-900 hover:bg-plum/5 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page}
              className={`flex size-9 items-center justify-center rounded-full text-sm font-medium ${
                p === page ? "bg-plum text-ivory" : "text-plum-soft hover:bg-plum/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          className="flex size-9 items-center justify-center rounded-full border border-plum/15 text-plum-900 hover:bg-plum/5 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
