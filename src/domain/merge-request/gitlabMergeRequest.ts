export interface GitLabMergeRequest {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string | null;
  state: "opened" | "closed" | "merged" | "locked";
  merged_by: GitLabUserSummary | null;
  merged_at: string | null;
  closed_by: GitLabUserSummary | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  target_branch: string;
  source_branch: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  author: GitLabUserSummary;
  assignees: GitLabUserSummary[];
  reviewers: GitLabUserSummary[];
  source_project_id: number;
  target_project_id: number;
  labels: string[];
  draft: boolean;
  work_in_progress: boolean;
  milestone: GitLabMilestoneSummary | null;
  squash: boolean;
  squash_on_merge: boolean;
  discussion_locked: boolean;
  should_remove_source_branch: boolean;
  web_url: string;
  references: {
    short: string;
    relative: string;
    full: string;
  };
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: string | null;
    human_total_time_spent: string | null;
  };
  squash_commit_sha: string | null;
  assignee: GitLabUserSummary | null;
}

interface GitLabUserSummary {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string | null;
  web_url: string;
}

interface GitLabMilestoneSummary {
  id: number;
  iid: number;
  title: string;
  description: string;
  state: string;
  web_url: string;
}

export interface GitLabMRNote {
  id: number;
  type: string | null;
  body: string;
  attachment: string | null;
  author: GitLabUserSummary;
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  resolvable: boolean;
  resolved: boolean;
}

export interface GitLabMRDiscussion {
  id: string;
  individual_note: boolean;
  notes: GitLabMRNote[];
}

export interface GitLabMRDiffFile {
  old_path: string;
  new_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
  diff: string;
}
