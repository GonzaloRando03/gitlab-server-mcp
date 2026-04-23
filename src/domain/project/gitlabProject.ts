export interface GitLabProject {
  id: number;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  description: string | null;
  default_branch: string;
  visibility: "private" | "internal" | "public";
  archived: boolean;
  created_at: string;
  updated_at: string;
  web_url: string;
  avatar_url: string | null;
  star_count: number;
  forks_count: number;
  statistics?: {
    commits_count: number;
    storage_size: number;
    repository_size: number;
    lfs_objects_size: number;
    job_artifacts_size: number;
  };
}

export interface GitLabBranch {
  name: string;
  commit: {
    id: string;
    short_id: string;
    title: string;
    author_name: string;
    author_email: string;
    created_at: string;
    parent_ids: string[];
  };
  protected: boolean;
  default: boolean;
}

export interface GitLabCommit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
  created_at: string;
  parent_ids: string[];
  message: string;
}

export interface GitLabRepositoryFile {
  file_name: string;
  file_path: string;
  size: number;
  encoding: string;
  content: string;
  content_sha256: string;
  ref: string;
  blob_id: string;
  commit_id: string;
}
