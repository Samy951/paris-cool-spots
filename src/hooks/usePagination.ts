import { useState, useMemo } from 'react';

export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationControls {
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export interface UsePaginationResult<T> extends PaginationConfig, PaginationControls {
  data: T[];
}

/**
 * Hook personnalisé pour gérer la pagination
 * Optimise l'affichage de grandes listes en limitant les éléments rendus
 */
export function usePagination<T>(
  items: T[],
  initialPageSize: number = 20
): UsePaginationResult<T> {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const paginationData = useMemo(() => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = items.slice(startIndex, endIndex);

    return {
      data,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }, [items, page, pageSize]);

  const nextPage = () => {
    if (paginationData.hasNextPage) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (paginationData.hasPreviousPage) {
      setPage(page - 1);
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= paginationData.totalPages) {
      setPage(newPage);
    }
  };

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  };

  return {
    page,
    pageSize,
    ...paginationData,
    nextPage,
    previousPage,
    goToPage,
    setPageSize: handleSetPageSize,
  };
} 