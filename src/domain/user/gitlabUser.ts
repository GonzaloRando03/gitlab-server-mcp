export interface GitLabUser {
  id: number;
  username: string;
  name: string;
  state: string;
  locked: boolean;
  avatar_url: string | null;
  web_url: string;
  created_at: string;
  created_by: string | null;
  bio: string | null;
  bio_html: string | null;
  location: string | null;
  public_email: string | null;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization: string | null;
  job_title: string | null;
  pronouns: string | null;
  bot: boolean;
  work_information: string | null;
  followee_count: number;
  follower_count: number;
  namespace: GitLabNamespace;
  custom_attributes: GitLabCustomAttribute[];
  last_sign_in_at: string | null;
  last_activity_on: string | null;
  email: string | null;
  theme_id: number | null;
  color_scheme_id: number | null;
  projects_limit: number;
  current_sign_in_at: string | null;
  identities: GitLabIdentity[];
  can_create_group: boolean;
  can_create_project: boolean;
  two_factor_enabled: boolean;
  external: boolean;
  private_profile: boolean;
  commit_email: string;
}

interface GitLabNamespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
}

interface GitLabCustomAttribute {
  key: string;
  value: string;
}

interface GitLabIdentity {
  provider: string;
  extern_uid: string;
}
