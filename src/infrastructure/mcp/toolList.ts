export const toolList = {
  tools: [
    // ── User ─────────────────────────────────────────────────────────────────
    {
      name: "get_current_user",
      description: "Gets the currently authenticated GitLab user.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "list_users",
      description: "Lists all GitLab users with optional search.",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "number", description: "Page number" },
          perPage: {
            type: "number",
            description: "Items per page (default 20, max 100)",
          },
          search: {
            type: "string",
            description: "Search users by name or username",
          },
          orderBy: {
            type: "string",
            description: "Order field (id, name, username, created_at)",
          },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
        },
      },
    },

    // ── Groups ───────────────────────────────────────────────────────────────
    {
      name: "list_groups",
      description: "Lists all GitLab groups the user has access to.",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          search: { type: "string", description: "Search groups by name" },
          orderBy: { type: "string", description: "Order field" },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
          minAccessLevel: {
            type: "number",
            description: "Minimum access level filter",
          },
        },
      },
    },
    {
      name: "list_group_members",
      description: "Lists members of a GitLab group.",
      inputSchema: {
        type: "object",
        properties: {
          groupId: { type: "number", description: "Group ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
        },
        required: ["groupId"],
      },
    },

    // ── Projects ─────────────────────────────────────────────────────────────
    {
      name: "list_projects",
      description: "Lists GitLab projects with optional filters.",
      inputSchema: {
        type: "object",
        properties: {
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          membership: {
            type: "boolean",
            description: "Only projects where user is a member",
          },
          minAccessLevel: {
            type: "number",
            description: "Minimum access level",
          },
          search: { type: "string", description: "Search projects by name" },
          orderBy: {
            type: "string",
            description: "Order field (id, name, path, created_at, updated_at)",
          },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
        },
      },
    },
    {
      name: "get_project",
      description:
        "Gets details of a specific GitLab project by ID or URL-encoded path (e.g., 'group%2Fproject').",
      inputSchema: {
        type: "object",
        properties: {
          projectId: {
            type: ["number", "string"],
            description:
              "Project ID (numeric) or URL-encoded path (e.g., 'group%2Fproject')",
          },
        },
        required: ["projectId"],
      },
    },
    {
      name: "get_projects_by_name",
      description:
        "Searches GitLab projects by name and returns all matching projects with their IDs.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Project name to search for (partial match)",
          },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          membership: {
            type: "boolean",
            description: "Only projects where user is a member",
          },
          orderBy: {
            type: "string",
            description: "Order field (id, name, path, created_at, updated_at)",
          },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
        },
        required: ["name"],
      },
    },
    {
      name: "list_branches",
      description: "Lists all branches in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
        },
        required: ["projectId"],
      },
    },
    {
      name: "list_commits",
      description: "Lists commits in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          refName: { type: "string", description: "Branch or tag name" },
          since: { type: "string", description: "Start date (ISO 8601)" },
          until: { type: "string", description: "End date (ISO 8601)" },
        },
        required: ["projectId"],
      },
    },

    {
      name: "list_group_projects",
      description:
        "Lists all projects within a GitLab group, including subgroups.",
      inputSchema: {
        type: "object",
        properties: {
          groupId: { type: "number", description: "Group ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          search: { type: "string", description: "Search projects by name" },
          orderBy: {
            type: "string",
            description: "Order field (id, name, path, created_at, updated_at)",
          },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
        },
        required: ["groupId"],
      },
    },

    // ── Merge Requests ───────────────────────────────────────────────────────
    {
      name: "list_mrs",
      description: "Lists merge requests in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          state: {
            type: "string",
            enum: ["opened", "closed", "merged", "all"],
            description: "MR state filter",
          },
          orderBy: { type: "string", description: "Order field" },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
          search: { type: "string", description: "Search MRs by title" },
        },
        required: ["projectId"],
      },
    },
    {
      name: "get_mr",
      description: "Gets details of a specific merge request.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          mrIid: { type: "number", description: "Merge Request IID" },
        },
        required: ["projectId", "mrIid"],
      },
    },
    {
      name: "get_mr_diff",
      description:
        "Gets the file diffs (changes) of a merge request, including the unified diff for each changed file.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          mrIid: { type: "number", description: "Merge Request IID" },
        },
        required: ["projectId", "mrIid"],
      },
    },
    {
      name: "create_mr",
      description: "Creates a new merge request in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          source_branch: { type: "string", description: "Source branch name" },
          target_branch: { type: "string", description: "Target branch name" },
          title: { type: "string", description: "MR title" },
          description: { type: "string", description: "MR description" },
          remove_source_branch: {
            type: "boolean",
            description: "Remove source branch after merge",
          },
          squash: { type: "boolean", description: "Squash commits on merge" },
        },
        required: ["projectId", "source_branch", "target_branch", "title"],
      },
    },
    {
      name: "approve_mr",
      description: "Approves a merge request.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          mrIid: { type: "number", description: "Merge Request IID" },
        },
        required: ["projectId", "mrIid"],
      },
    },
    {
      name: "merge_mr",
      description: "Merges a merge request.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          mrIid: { type: "number", description: "Merge Request IID" },
          squash: { type: "boolean", description: "Squash commits on merge" },
          squash_commit_message: {
            type: "string",
            description: "Commit message for squashed MR",
          },
          merge_commit_message: {
            type: "string",
            description: "Commit message for merge",
          },
        },
        required: ["projectId", "mrIid"],
      },
    },
    {
      name: "list_mr_notes",
      description: "Lists notes (comments) on a merge request.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          mrIid: { type: "number", description: "Merge Request IID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
        },
        required: ["projectId", "mrIid"],
      },
    },
    {
      name: "create_mr_note",
      description: "Adds a note (comment) to a merge request.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          mrIid: { type: "number", description: "Merge Request IID" },
          body: { type: "string", description: "Comment text" },
        },
        required: ["projectId", "mrIid", "body"],
      },
    },

    // ── Issues ────────────────────────────────────────────────────────────────
    {
      name: "list_issues",
      description: "Lists issues in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          state: {
            type: "string",
            enum: ["opened", "closed", "all"],
            description: "Issue state filter",
          },
          labels: { type: "string", description: "Comma-separated labels" },
          search: { type: "string", description: "Search issues by title" },
          orderBy: { type: "string", description: "Order field" },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
        },
        required: ["projectId"],
      },
    },
    {
      name: "get_issue",
      description: "Gets details of a specific issue.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          issueIid: { type: "number", description: "Issue IID" },
        },
        required: ["projectId", "issueIid"],
      },
    },
    {
      name: "create_issue",
      description: "Creates a new issue in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          title: { type: "string", description: "Issue title" },
          description: { type: "string", description: "Issue description" },
          labels: { type: "string", description: "Comma-separated labels" },
          milestone_id: { type: "number", description: "Milestone ID" },
          assignees: {
            type: "array",
            items: { type: "string" },
            description: "Assignee usernames",
          },
          weight: { type: "number", description: "Issue weight" },
          issue_type: {
            type: "string",
            enum: ["issue", "incident", "test_case"],
            description: "Issue type",
          },
        },
        required: ["projectId", "title"],
      },
    },
    {
      name: "close_issue",
      description: "Closes an issue in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          issueIid: { type: "number", description: "Issue IID" },
        },
        required: ["projectId", "issueIid"],
      },
    },
    {
      name: "add_comment_to_issue",
      description: "Adds a comment to an issue.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          issueIid: { type: "number", description: "Issue IID" },
          body: { type: "string", description: "Comment text" },
        },
        required: ["projectId", "issueIid", "body"],
      },
    },

    // ── Pipelines ─────────────────────────────────────────────────────────────
    {
      name: "list_pipelines",
      description: "Lists pipelines in a GitLab project.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
          ref: { type: "string", description: "Branch or tag name" },
          status: {
            type: "string",
            description: "Pipeline status (running, success, failed, etc.)",
          },
          orderBy: { type: "string", description: "Order field" },
          sort: {
            type: "string",
            enum: ["asc", "desc"],
            description: "Sort order",
          },
        },
        required: ["projectId"],
      },
    },
    {
      name: "trigger_pipeline",
      description: "Triggers a new pipeline for a given ref.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          ref: { type: "string", description: "Branch, tag, or commit SHA" },
          variables: {
            type: "array",
            items: {
              type: "object",
              properties: {
                key: { type: "string" },
                value: { type: "string" },
              },
              required: ["key", "value"],
            },
            description: "Pipeline variables",
          },
        },
        required: ["projectId", "ref"],
      },
    },
    {
      name: "retry_pipeline",
      description: "Retries a failed or canceled pipeline.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          pipelineId: { type: "number", description: "Pipeline ID" },
        },
        required: ["projectId", "pipelineId"],
      },
    },
    {
      name: "list_jobs",
      description: "Lists jobs in a pipeline.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "number", description: "Project ID" },
          pipelineId: { type: "number", description: "Pipeline ID" },
          page: { type: "number", description: "Page number" },
          perPage: { type: "number", description: "Items per page" },
        },
        required: ["projectId", "pipelineId"],
      },
    },
  ],
};
