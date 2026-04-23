import { describe, it, expect } from "vitest";
import { createToolRouter } from "@/infrastructure/mcp/toolRouter";
import { createContainer } from "@/infrastructure/mcp/container";

describe("Tool Router", () => {
  const container = createContainer({ token: "test-token" });
  const router = createToolRouter(container);

  it("should return error for unknown tool", async () => {
    const result = await router("unknown_tool", {});
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain("Unknown tool");
  });
});
