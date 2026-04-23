import { GitLabApiBaseController } from "@/infrastructure/controllers/gitlabApiBaseController";
import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { GitLabGroup, GitLabGroupMember } from "@/domain/group/gitlabGroup";
import { GroupService } from "@/application/services/groupService";

export class GroupController
  extends GitLabApiBaseController
  implements GroupService
{
  constructor(config: GitLabApiConfig) {
    super(config);
  }

  async listGroups(params?: {
    page?: number;
    perPage?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
    minAccessLevel?: number;
  }): Promise<GitLabGroup[]> {
    const response = await this.request<GitLabGroup[]>(
      "GET",
      "/groups",
      {
        page: params?.page,
        per_page: params?.perPage,
        search: params?.search,
        order_by: params?.orderBy,
        sort: params?.sort,
        min_access_level: params?.minAccessLevel,
      },
      "List groups",
    );
    return Array.isArray(response) ? response : [];
  }

  async getGroup(groupId: number | string): Promise<GitLabGroup> {
    return this.request<GitLabGroup>(
      "GET",
      `/groups/${encodeURIComponent(String(groupId))}`,
      undefined,
      "Get group",
    );
  }

  async listGroupMembers(
    groupId: number | string,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabGroupMember[]> {
    const response = await this.request<GitLabGroupMember[]>(
      "GET",
      `/groups/${encodeURIComponent(String(groupId))}/members`,
      {
        page: params?.page,
        per_page: params?.perPage,
      },
      "List group members",
    );
    return Array.isArray(response) ? response : [];
  }

  async listGroupProjects(
    groupId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      orderBy?: string;
      sort?: string;
    },
  ): Promise<GitLabGroupProject[]> {
    const response = await this.request<GitLabGroupProject[]>(
      "GET",
      `/groups/${encodeURIComponent(String(groupId))}/projects`,
      {
        page: params?.page,
        per_page: params?.perPage,
        order_by: params?.orderBy,
        sort: params?.sort,
      },
      "List group projects",
    );
    return Array.isArray(response) ? response : [];
  }
}

interface GitLabGroupProject {
  id: number;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  description: string | null;
  default_branch: string;
  visibility: string;
  archived: boolean;
  web_url: string;
  avatar_url: string | null;
}
