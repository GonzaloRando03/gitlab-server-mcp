import { GitLabApiBaseController } from "@/infrastructure/controllers/gitlabApiBaseController";
import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { GitLabProject } from "@/domain/project/gitlabProject";
import { GitLabBranch } from "@/domain/project/gitlabProject";
import { GitLabCommit } from "@/domain/project/gitlabProject";
import { ProjectService } from "@/application/services/projectService";

export class ProjectController
  extends GitLabApiBaseController
  implements ProjectService
{
  constructor(config: GitLabApiConfig) {
    super(config);
  }

  async listProjects(params?: {
    page?: number;
    perPage?: number;
    membership?: boolean;
    minAccessLevel?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
  }): Promise<{ projects: GitLabProject[]; total: number }> {
    const response = await this.request<GitLabProject[]>(
      "GET",
      "/projects",
      {
        page: params?.page,
        per_page: params?.perPage,
        membership: params?.membership,
        min_access_level: params?.minAccessLevel,
        search: params?.search,
        order_by: params?.orderBy,
        sort: params?.sort,
      },
      "List projects",
    );

    return {
      projects: Array.isArray(response) ? response : [],
      total: Array.isArray(response) ? response.length : 0,
    };
  }

  async getProject(projectId: number | string): Promise<GitLabProject> {
    return this.request<GitLabProject>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}`,
      undefined,
      "Get project",
    );
  }

  async listGroupProjects(
    groupId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      search?: string;
      orderBy?: string;
      sort?: string;
    },
  ): Promise<{ projects: GitLabProject[]; total: number }> {
    const response = await this.request<GitLabProject[]>(
      "GET",
      `/groups/${encodeURIComponent(String(groupId))}/projects`,
      {
        page: params?.page,
        per_page: params?.perPage,
        search: params?.search,
        order_by: params?.orderBy,
        sort: params?.sort,
        include_subgroups: true,
      },
      "List group projects",
    );
    return {
      projects: Array.isArray(response) ? response : [],
      total: Array.isArray(response) ? response.length : 0,
    };
  }

  async listBranches(
    projectId: number | string,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabBranch[]> {
    const response = await this.request<GitLabBranch[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/repository/branches`,
      {
        page: params?.page,
        per_page: params?.perPage,
      },
      "List branches",
    );
    return Array.isArray(response) ? response : [];
  }

  async listCommits(
    projectId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      refName?: string;
      since?: string;
      until?: string;
    },
  ): Promise<GitLabCommit[]> {
    const response = await this.request<GitLabCommit[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/repository/commits`,
      {
        page: params?.page,
        per_page: params?.perPage,
        ref_name: params?.refName,
        since: params?.since,
        until: params?.until,
      },
      "List commits",
    );
    return Array.isArray(response) ? response : [];
  }

  async listTags(
    projectId: number | string,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabTag[]> {
    const response = await this.request<GitLabTag[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/repository/tags`,
      {
        page: params?.page,
        per_page: params?.perPage,
      },
      "List tags",
    );
    return Array.isArray(response) ? response : [];
  }
}

interface GitLabTag {
  name: string;
  commit: {
    id: string;
    short_id: string;
    title: string;
    author_name: string;
    author_email: string;
    created_at: string;
  };
  target: string;
  message: string | null;
  protected: boolean;
}
