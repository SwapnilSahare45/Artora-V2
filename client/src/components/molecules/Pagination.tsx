"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean; // Whether next page exists
  hasPrevPage: boolean; // Whether previous page exists
}

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Create a new URL with updated page query param
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  // Navigate to selected page
  const handlePageChange = (pageNumber: number) => {
    router.push(createPageURL(pageNumber));
  };

  // Generate page numbers with ellipsis for large page count
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    // If total pages is is less than max visible then show all page numbers
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Show left ellipsis if current page is far from start
      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show right ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Hide pagination if there is only one page
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2">
      {/* Previous page Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={`flex items-center justify-center w-10 h-10 border transition-all ${
          hasPrevPage
            ? "border-glass hover:border-brand text-white hover:bg-brand/5"
            : "border-glass/30 text-dim cursor-not-allowed opacity-40"
        }`}
      >
        <LuChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-dim font-jakarta text-sm"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`w-10 h-10 font-jakarta text-sm border transition-all ${
                isActive
                  ? "border-brand bg-brand text-white shadow-neon"
                  : "border-glass hover:border-brand text-white hover:bg-brand/5"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next page Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`flex items-center justify-center w-10 h-10 border transition-all ${
          hasNextPage
            ? "border-glass hover:border-brand text-white hover:bg-brand/5"
            : "border-glass/30 text-dim cursor-not-allowed opacity-40"
        }`}
      >
        <LuChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
