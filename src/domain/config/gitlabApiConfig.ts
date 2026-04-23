export interface GitLabApiConfig {
  token?: string;
  baseUrl?: string;
}

export interface GitLabPaginationParams {
  page?: number;
  perPage?: number;
  orderBy?: string;
  sort?: "asc" | "desc";
}

export interface GitLabPaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
