import { GitLabUser } from "@/domain/user/gitlabUser";

export interface UserService {
  getCurrentUser(): Promise<GitLabUser>;

  listUsers(params?: {
    page?: number;
    perPage?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
  }): Promise<GitLabUser[]>;

  getUser(userId: number): Promise<GitLabUser>;
}
