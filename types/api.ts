export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: PaginationMeta;
}

export interface User {
  id: number;
  email?: string;
  full_name?: string | null;
}
