import { GitLabApiBaseController } from "@/infrastructure/controllers/gitlabApiBaseController";
import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { GitLabUser } from "@/domain/user/gitlabUser";
import { UserService } from "@/application/services/userService";

export class UserController
  extends GitLabApiBaseController
  implements UserService
{
  constructor(config: GitLabApiConfig) {
    super(config);
  }

  async getCurrentUser(): Promise<GitLabUser> {
    return this.request<GitLabUser>(
      "GET",
      "/user",
      undefined,
      "Get current user",
    );
  }

  async listUsers(params?: {
    page?: number;
    perPage?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
  }): Promise<GitLabUser[]> {
    const response = await this.request<GitLabUser[]>(
      "GET",
      "/users",
      {
        page: params?.page,
        per_page: params?.perPage,
        search: params?.search,
        order_by: params?.orderBy,
        sort: params?.sort,
      },
      "List users",
    );
    return Array.isArray(response) ? response : [];
  }

  async getUser(userId: number): Promise<GitLabUser> {
    return this.request<GitLabUser>(
      "GET",
      `/users/${userId}`,
      undefined,
      "Get user",
    );
  }
}
