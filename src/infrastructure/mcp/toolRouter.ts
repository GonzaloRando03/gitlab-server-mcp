import { AppContainer } from "@/infrastructure/mcp/container";
import { handleProject } from "@/infrastructure/mcp/handlers/projectHandler";
import { handleMergeRequest } from "@/infrastructure/mcp/handlers/mergeRequestHandler";
import { handleIssue } from "@/infrastructure/mcp/handlers/issueHandler";
import { handlePipeline } from "@/infrastructure/mcp/handlers/pipelineHandler";
import { handleUser } from "@/infrastructure/mcp/handlers/userHandler";
import { handleGroup } from "@/infrastructure/mcp/handlers/groupHandler";

type McpToolResponse =
  | { content: { type: "text"; text: string }[] }
  | { content: { type: "text"; text: string }[]; isError: true };

export function createToolRouter(
  container: AppContainer,
): (name: string, args: Record<string, unknown>) => Promise<McpToolResponse> {
  const handlers = [
    (n: string, a: Record<string, unknown>) => handleProject(n, a, container),
    (n: string, a: Record<string, unknown>) => handleMergeRequest(n, a, container),
    (n: string, a: Record<string, unknown>) => handleIssue(n, a, container),
    (n: string, a: Record<string, unknown>) => handlePipeline(n, a, container),
    (n: string, a: Record<string, unknown>) => handleUser(n, a, container),
    (n: string, a: Record<string, unknown>) => handleGroup(n, a, container),
  ];

  return async (name, args) => {
    try {
      for (const handler of handlers) {
        const result = await handler(name, args);
        if (result !== null) {
          return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          };
        }
      }

      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  };
}
