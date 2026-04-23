export interface GitLabGroup {
  id: number;
  name: string;
  path: string;
  full_path: string;
  kind: string;
  description: string | null;
  visibility: "private" | "internal" | "public";
  share_with_group_lock: boolean;
  require_two_factor_authentication: boolean;
  two_factor_grace_period: number;
  project_creation_level: string | null;
  auto_devops_enabled: string | null;
  emails_disabled: string | null;
  mentions_disabled: string | null;
  lfs_enabled: boolean;
  default_branch_protection: number;
  avatar_url: string | null;
  web_url: string;
  request_access_enabled: boolean;
  fork_storage_version_limit: number | null;
  shared_runners_minutes_limit: number | null;
  extra_shared_runners_minutes_limit: number | null;
  marked_for_deletion_on: string | null;
  created_at: string;
  parent_id: number | null;
  members_count_with_descendants: number;
  with_custom_attributes: boolean;
}

export interface GitLabGroupMember {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string | null;
  web_url: string;
  access_level: number;
  created_at: string;
  created_by: GitLabUserSummary | null;
  expires_at: string | null;
  group_id: number;
  group_name: string;
  group_path: string;
}

interface GitLabUserSummary {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string | null;
  web_url: string;
}
