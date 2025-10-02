import React from 'react';
import { Button } from '@/components/ui/button';
import { PaginationProps } from '@/types/interface';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export const Pagination = ({
  keyword = '',
  pagination,
  onPageChange,
  itemsPerPage = 10,
  selectedCategory = null,
}: PaginationProps) => {
  const currentPage = pagination?.currentPage ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const totalItems = pagination?.totalItems ?? 0;

  const handlePageChange = (page: number) => {
    onPageChange({
      page,
      limit: itemsPerPage,
      categoryId: selectedCategory,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="flex items-center space-x-2 text-base">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-8 h-8 md:h-10 md:w-10 rounded-full text-gray-600 border-gray-200 hover:text-green-600 hover:border-green-300 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronsLeft className="w-6 h-6" />
        </Button>

        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          let pageNum;

          if (totalPages <= 3) {
            // Nếu tổng số trang ≤ 3 thì hiển thị hết
            pageNum = i + 1;
          } else if (currentPage === 1) {
            // Đang ở trang 1 => hiện 1 2 3
            pageNum = i + 1;
          } else if (currentPage === totalPages) {
            // Đang ở trang cuối => hiện last-2 last-1 last
            pageNum = totalPages - 2 + i;
          } else {
            // Các trường hợp còn lại => hiện currentPage, currentPage+1, currentPage+2
            pageNum = currentPage - 1 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? 'default' : 'outline'}
              className={`w-8 h-8 md:h-10 md:w-10 md:text-base rounded-full text-sm font-semibold text-center px-3
        ${
          currentPage === pageNum
            ? 'bg-gradient-to-r from-green-cyan-500 to-lime-600 text-white shadow-sm hover:from-green-700 hover:to-lime-700'
            : 'text-gray-600 border-gray-200 hover:text-green-600 hover:border-green-300 hover:bg-green-50 transition-all duration-200'
        }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-2 text-gray-400">...</span>
            <Button
              variant="outline"
              className="w-8 h-8 md:h-10 md:w-10 rounded-full text-gray-600 border-gray-200 hover:text-green-600 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-8 h-8 md:h-10 md:w-10 rounded-full text-gray-600 border-gray-200 hover:text-green-600 hover:border-green-300 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronsRight className="w-6 h-6" />
        </Button>
      </div>

      <div className="mt-4 text-[0.8rem] md:text-sm text-gray-600 text-center">
        Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} của {totalItems}{' '}
        {keyword}
      </div>
    </div>
  );
};
