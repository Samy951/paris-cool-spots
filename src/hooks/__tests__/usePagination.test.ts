import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../usePagination';

const mockData = Array.from({ length: 50 }, (_, i) => ({ id: i, name: `Item ${i}` }));

describe('usePagination', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalItems).toBe(50);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.data).toHaveLength(10);
    expect(result.current.data[0]).toEqual({ id: 0, name: 'Item 0' });
  });

  it('should navigate to next page correctly', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(2);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.data[0]).toEqual({ id: 10, name: 'Item 10' });
  });

  it('should navigate to previous page correctly', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.nextPage();
    });

    act(() => {
      result.current.previousPage();
    });

    expect(result.current.page).toBe(1);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.data[0]).toEqual({ id: 0, name: 'Item 0' });
  });

  it('should not go beyond boundaries', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    // Try to go to previous from first page
    act(() => {
      result.current.previousPage();
    });
    expect(result.current.page).toBe(1);

    // Go to last page and try to go beyond
    act(() => {
      result.current.goToPage(5);
    });

    act(() => {
      result.current.nextPage();
    });
    
    expect(result.current.page).toBe(5);
    expect(result.current.hasNextPage).toBe(false);
  });

  it('should go to specific page correctly', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.goToPage(3);
    });

    expect(result.current.page).toBe(3);
    expect(result.current.data[0]).toEqual({ id: 20, name: 'Item 20' });
  });

  it('should change page size and reset to first page', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.goToPage(3);
    });

    act(() => {
      result.current.setPageSize(25);
    });

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(25);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.data).toHaveLength(25);
  });

  it('should handle empty data correctly', () => {
    const { result } = renderHook(() => usePagination([], 10));

    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.data).toHaveLength(0);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
  });

  it('should handle data smaller than page size', () => {
    const smallData = [{ id: 1 }, { id: 2 }];
    const { result } = renderHook(() => usePagination(smallData, 10));

    expect(result.current.totalPages).toBe(1);
    expect(result.current.data).toHaveLength(2);
    expect(result.current.hasNextPage).toBe(false);
  });
}); 