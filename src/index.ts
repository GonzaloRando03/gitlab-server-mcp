#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { createContainer } from "@/infrastructure/mcp/container";
import { createToolRouter } from "@/infrastructure/mcp/toolRouter";
import { toolList } from "@/infrastructure/mcp/toolList";

const config = {
  token: process.env.GITLAB_TOKEN,
  baseUrl: process.env.GITLAB_URL,
};

const container = createContainer(config);
const handleToolCall = createToolRouter(container);

const server = new Server(
  { name: "gitlab-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => toolList);

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;
  return handleToolCall(name, args as Record<string, unknown>);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("GitLab MCP server started (stdio)\n");
}

main().catch((err) => {
  process.stderr.write(
    `Fatal error: ${err instanceof Error ? err.message : String(err)}\n`,
  );
  process.exit(1);
});
