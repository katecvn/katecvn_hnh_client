import React from 'react';
import { Button } from '@/components/ui/button';

export const Pagination = ({
  keyword,
  pagination,
  onPageChange,
  itemsPerPage = 10,
  selectedCategory = null,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange({
      page,
      limit: itemsPerPage,
      categoryId: selectedCategory,
    });
  };

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          disabled={pagination.currentPage <= 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          className="text-gray-600 border-gray-200 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Trước
        </Button>

        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
          let pageNum;
          if (pagination.totalPages <= 5) {
            pageNum = i + 1;
          } else if (pagination.currentPage <= 3) {
            pageNum = i + 1;
          } else if (pagination.currentPage >= pagination.totalPages - 2) {
            pageNum = pagination.totalPages - 4 + i;
          } else {
            pageNum = pagination.currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={
                pagination.currentPage === pageNum ? 'default' : 'outline'
              }
              className={`min-w-[40px] text-center px-0
    ${
      pagination.currentPage === pageNum
        ? 'rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-sm hover:from-blue-700 hover:to-purple-700'
        : 'rounded-full text-gray-600 border-gray-200 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200'
    }`}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}

        {pagination.totalPages > 5 &&
          pagination.currentPage < pagination.totalPages - 2 && (
            <>
              <span className="px-2 text-gray-400">...</span>
              <Button
                variant="outline"
                className="text-gray-600 border-gray-200 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                onClick={() => handlePageChange(pagination.totalPages)}
              >
                {pagination.totalPages}
              </Button>
            </>
          )}

        <Button
          variant="outline"
          disabled={pagination.currentPage >= pagination.totalPages}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          className="text-gray-600 border-gray-200 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Sau
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        Hiển thị{' '}
        {Math.min(
          (pagination.currentPage - 1) * itemsPerPage + 1,
          pagination.totalItems
        )}{' '}
        -{' '}
        {Math.min(pagination.currentPage * itemsPerPage, pagination.totalItems)}{' '}
        của {pagination.totalItems} {keyword}
      </div>
    </div>
  );
};
