# GitLab MCP Server

MCP (_Model Context Protocol_) server that exposes the GitLab REST API as tools for AI agents. It allows models like GitHub Copilot or Claude to interact with GitLab projects, merge requests, issues, pipelines, and more directly from the chat interface.

## Table of Contents

- [Architecture](#architecture)
- [Requirements](#requirements)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Tools](#available-tools)
  - [Users](#users)
  - [Groups](#groups)
  - [Projects](#projects)
  - [Merge Requests](#merge-requests)
  - [Issues](#issues)
  - [Pipelines](#pipelines)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Tests](#tests)

---

## Architecture

The server follows a clean layered architecture:

```
┌─────────────────────────────────────┐
│            MCP Client               │
│  (Copilot / Claude / any LLM)       │
└──────────────┬──────────────────────┘
               │ stdio (JSON-RPC)
┌──────────────▼──────────────────────┐
│         Infrastructure              │
│  ┌─────────────────────────────┐    │
│  │  MCP Server (index.ts)      │    │
│  │  toolList · toolRouter      │    │
│  │  Domain handlers            │    │
│  └────────────┬────────────────┘    │
│  ┌────────────▼────────────────┐    │
│  │  Controllers (REST adapter)  │    │
│  └────────────┬────────────────┘    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│           Application              │
│  Use Cases (one per operation)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│             Domain                  │
│  Interfaces · Types · Errors        │
└──────────────┬──────────────────────┘
               │ fetch (HTTP/HTTPS)
┌──────────────▼──────────────────────┐
│        GitLab REST API              │
└─────────────────────────────────────┘
```

**Tool call flow:**

1. The agent invokes a tool (e.g. `list_mrs`).
2. The MCP `Server` receives the request via `stdio` and routes it with `toolRouter`.
3. The matching handler delegates to the application **Use Case**.
4. The Use Case calls the **Controller**, which extends `GitLabApiBaseController`.
5. The Controller makes the HTTP request to the GitLab API and returns the result.
6. The response is serialized to JSON and returned to the agent.

---

## Requirements

- **Node.js** >= 18
- A **GitLab** instance (GitLab.com or self-managed)
- A **Personal Access Token** with appropriate permissions

---

## Configuration

Authentication and the server URL are configured via **environment variables**:

| Environment variable | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `GITLAB_URL`         | Base URL of the GitLab instance (defaults to `https://gitlab.com`) |
| `GITLAB_TOKEN`       | Personal Access Token with required scopes                         |

### Token Scopes

The required scopes depend on the operations you want to perform:

| Scope              | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `read_api`         | Read access to the API (projects, MRs, issues, pipelines, etc.) |
| `api`              | Full API access including write operations                      |
| `read_user`        | Read user information                                           |
| `read_repository`  | Read repository files and branches                              |
| `write_repository` | Push and merge operations                                       |

---

## Usage

The server communicates exclusively over **stdio** using the MCP JSON-RPC protocol. It does not expose any HTTP port.

### VS Code integration (GitHub Copilot)

Add the following entry to your VS Code MCP configuration file (`.vscode/mcp.json` or the global `mcp.json` in your user settings folder):

```json
{
  "servers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "gitlab-mcp-server@latest"],
      "env": {
        "GITLAB_URL": "https://gitlab.com",
        "GITLAB_TOKEN": "glpat-xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### Claude Desktop integration

In `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "gitlab-mcp-server@latest"],
      "env": {
        "GITLAB_URL": "https://gitlab.com",
        "GITLAB_TOKEN": "glpat-xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### For self-managed GitLab instances

```json
{
  "servers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "gitlab-mcp-server@latest"],
      "env": {
        "GITLAB_URL": "https://gitlab.mycompany.com",
        "GITLAB_TOKEN": "glpat-xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

---

## Available Tools

### Users

| Tool               | Description                                  | Required params |
| ------------------ | -------------------------------------------- | --------------- |
| `get_current_user` | Gets the currently authenticated GitLab user | —               |
| `list_users`       | Lists all GitLab users with optional search  | —               |

### Groups

| Tool                 | Description                                    | Required params |
| -------------------- | ---------------------------------------------- | --------------- |
| `list_groups`        | Lists all GitLab groups the user has access to | —               |
| `list_group_members` | Lists members of a GitLab group                | `groupId`       |

### Projects

| Tool                   | Description                                                | Required params |
| ---------------------- | ---------------------------------------------------------- | --------------- |
| `list_projects`        | Lists GitLab projects with optional filters                | —               |
| `get_project`          | Gets details of a project by ID or URL-encoded path        | `projectId`     |
| `get_projects_by_name` | Searches projects by name and returns all matches with IDs | `name`          |
| `list_group_projects`  | Lists all projects within a group, including subgroups     | `groupId`       |
| `list_branches`        | Lists all branches in a GitLab project                     | `projectId`     |
| `list_commits`         | Lists commits in a GitLab project                          | `projectId`     |

### Merge Requests

| Tool             | Description                              | Required params                                        |
| ---------------- | ---------------------------------------- | ------------------------------------------------------ |
| `list_mrs`       | Lists merge requests in a GitLab project | `projectId`                                            |
| `get_mr`         | Gets details of a specific merge request | `projectId`, `mrIid`                                   |
| `create_mr`      | Creates a new merge request              | `projectId`, `source_branch`, `target_branch`, `title` |
| `approve_mr`     | Approves a merge request                 | `projectId`, `mrIid`                                   |
| `merge_mr`       | Merges a merge request                   | `projectId`, `mrIid`                                   |
| `list_mr_notes`  | Lists notes on a merge request           | `projectId`, `mrIid`                                   |
| `create_mr_note` | Adds a note to a merge request           | `projectId`, `mrIid`, `body`                           |

### Issues

| Tool                   | Description                      | Required params                 |
| ---------------------- | -------------------------------- | ------------------------------- |
| `list_issues`          | Lists issues in a GitLab project | `projectId`                     |
| `get_issue`            | Gets details of a specific issue | `projectId`, `issueIid`         |
| `create_issue`         | Creates a new issue              | `projectId`, `title`            |
| `close_issue`          | Closes an issue                  | `projectId`, `issueIid`         |
| `add_comment_to_issue` | Adds a comment to an issue       | `projectId`, `issueIid`, `body` |

### Pipelines

| Tool               | Description                           | Required params           |
| ------------------ | ------------------------------------- | ------------------------- |
| `list_pipelines`   | Lists pipelines in a GitLab project   | `projectId`               |
| `trigger_pipeline` | Triggers a new pipeline               | `projectId`, `ref`        |
| `retry_pipeline`   | Retries a failed or canceled pipeline | `projectId`, `pipelineId` |
| `list_jobs`        | Lists jobs in a pipeline              | `projectId`, `pipelineId` |

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/gitlab-mcp-server.git
cd gitlab-mcp-server

# Install dependencies
npm install

# Run in development mode
GITLAB_URL=https://gitlab.com GITLAB_TOKEN=glpat-xxx npm run dev

# Build
npm run build
```

---

## Project Structure

```
gitlab-mcp/
├── src/
│   ├── index.ts                        # Entry point: initializes the MCP server
│   ├── domain/                        # Domain layer (interfaces, types, errors)
│   │   ├── config/                    # GitLabApiConfig
│   │   ├── errors/                    # GitLabAPIError, GitLabErrorType
│   │   └── <domain>/                  # Domain-specific types (project, merge-request, issue, etc.)
│   ├── application/
│   │   ├── use-cases/                 # One Use Case per business operation
│   │   │   ├── project/               # ListProjects, GetProject, etc.
│   │   │   ├── merge-request/         # ListMRs, CreateMR, etc.
│   │   │   ├── issue/                 # ListIssues, CreateIssue, etc.
│   │   │   ├── pipeline/              # ListPipelines, TriggerPipeline, etc.
│   │   │   ├── user/                  # GetCurrentUser, ListUsers
│   │   │   └── group/                 # ListGroups, ListGroupMembers
│   │   └── services/                  # Service interfaces
│   └── infrastructure/
│       ├── controllers/               # HTTP adapters to the GitLab API
│       │   ├── gitlabApiBaseController.ts  # fetch + auth + error handling
│       │   └── <domain>Controller.ts
│       ├── mcp/
│       │   ├── container.ts           # IoC: instantiates all use cases and controllers
│       │   ├── toolList.ts            # JSON schema definition for every tool
│       │   ├── toolRouter.ts          # Routes tool names to the right handler
│       │   └── handlers/              # One handler per domain
│       └── utils/                     # withErrorHandling, classifyHttpError
├── tests/                             # Unit tests (Vitest)
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## Tests

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch

# Visual UI in the browser
npm run test:ui
```

---

## License

MIT License - see [LICENSE](LICENSE) file for details.
