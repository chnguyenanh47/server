export interface PaginationResult<T> {
  message: string;
  meta: {
    totalPages: number;
    currentPage: number;
    limit: number;
    totalData: number;
    search?: string;
  };
  data: T[];
}

export function paginate<T>(
  items: T[],
  page: number,
  limit: number,
  message: string = 'Data retrieved successfully',
): PaginationResult<T> {
  const totalData = items.length;
  const validLimit = Math.max(1, limit);
  const totalPages = Math.ceil(totalData / validLimit);
  const validPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (validPage - 1) * validLimit;
  const endIndex = Math.min(startIndex + validLimit, totalData);

  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    message,
    meta: {
      totalData,
      totalPages,
      currentPage: validPage,
      limit: validLimit,
    },
    data: paginatedItems,
  };
}
