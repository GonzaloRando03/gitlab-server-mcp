import {
  GitLabProject,
  GitLabBranch,
  GitLabCommit,
} from "@/domain/project/gitlabProject";

export interface ProjectService {
  listProjects(params?: {
    page?: number;
    perPage?: number;
    membership?: boolean;
    minAccessLevel?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
  }): Promise<{ projects: GitLabProject[]; total: number }>;

  getProject(projectId: number | string): Promise<GitLabProject>;

  listBranches(
    projectId: number | string,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabBranch[]>;

  listGroupProjects(
    groupId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      search?: string;
      orderBy?: string;
      sort?: string;
    },
  ): Promise<{ projects: GitLabProject[]; total: number }>;

  listCommits(
    projectId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      refName?: string;
      since?: string;
      until?: string;
    },
  ): Promise<GitLabCommit[]>;

  listTags(
    projectId: number | string,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabTag[]>;
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
