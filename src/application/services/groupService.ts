import { GitLabGroup, GitLabGroupMember } from "@/domain/group/gitlabGroup";

export interface GroupService {
  listGroups(params?: {
    page?: number;
    perPage?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
    minAccessLevel?: number;
  }): Promise<GitLabGroup[]>;

  getGroup(groupId: number | string): Promise<GitLabGroup>;

  listGroupMembers(
    groupId: number | string,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabGroupMember[]>;

  listGroupProjects(
    groupId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      orderBy?: string;
      sort?: string;
    },
  ): Promise<GitLabGroupProject[]>;
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
