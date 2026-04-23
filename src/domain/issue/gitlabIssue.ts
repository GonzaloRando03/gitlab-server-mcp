export interface GitLabIssue {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string | null;
  state: "opened" | "closed";
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  closed_by: GitLabUserSummary | null;
  labels: string[];
  assignee: GitLabUserSummary | null;
  assignees: GitLabUserSummary[];
  author: GitLabUserSummary;
  type: string;
  web_url: string;
  references: {
    short: string;
    relative: string;
    full: string;
  };
  severity: string | null;
  milestone: GitLabMilestoneSummary | null;
  labels_arr: string[];
  moved_to_id: number | null;
  epic_iid: number | null;
  discussion_locked: string | null;
  issue_type: string;
  service_desk_reply_to: string | null;
  to_doom: boolean;
  iteration: GitLabIterationSummary | null;
  weight: number | null;
  has_tasks: boolean;
  task_status: string | null;
  severity_id: number | null;
  complexity: string | null;
  due_date: string | null;
  started_on: string | null;
  locked: boolean;
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

interface GitLabIterationSummary {
  id: number;
  iid: number;
  title: string;
  sequence: number;
  group_id: number;
}

export interface GitLabIssueNote {
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
