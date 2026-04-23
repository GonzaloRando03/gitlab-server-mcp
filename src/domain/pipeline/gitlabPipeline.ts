export interface GitLabPipeline {
  id: number;
  iid: number;
  project_id: number;
  sha: string;
  ref: string;
  status: "pending" | "running" | "success" | "failed" | "canceled" | "skipped" | "manual" | "created" | "waiting_for_resource" | "preparing" | "scheduled";
  source: string;
  created_at: string;
  updated_at: string;
  web_url: string;
  user: GitLabUserSummary;
}

interface GitLabUserSummary {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string | null;
  web_url: string;
}

export interface GitLabJob {
  id: number;
  name: string;
  stage: string;
  status: string;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  duration: number | null;
  queued_duration: number | null;
  coverage: string | null;
  web_url: string;
  allow_failure: boolean;
  script: string;
  user: GitLabUserSummary;
  pipeline: GitLabPipelineSummary;
  artifacts: GitLabArtifact[] | null;
  runner: GitLabRunnerSummary | null;
}

interface GitLabUserSummary {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string | null;
  web_url: string;
}

interface GitLabPipelineSummary {
  id: number;
  iid: number;
  sha: string;
  ref: string;
  status: string;
}

interface GitLabArtifact {
  file_type: string;
  size: number;
  filename: string;
}

interface GitLabRunnerSummary {
  id: number;
  name: string;
  description: string;
  status: string;
}
