import { describe, it, expect } from "vitest";
import { toolList } from "@/infrastructure/mcp/toolList";

describe("Tool List", () => {
  it("should have all expected tools", () => {
    const toolNames = toolList.tools.map((t) => t.name);

    expect(toolNames).toContain("get_current_user");
    expect(toolNames).toContain("list_users");
    expect(toolNames).toContain("list_groups");
    expect(toolNames).toContain("list_projects");
    expect(toolNames).toContain("list_mrs");
    expect(toolNames).toContain("list_issues");
    expect(toolNames).toContain("list_pipelines");
  });

  it("should have valid input schemas for all tools", () => {
    for (const tool of toolList.tools) {
      expect(tool.inputSchema).toBeDefined();
      expect(tool.inputSchema.type).toBe("object");
      expect(tool.name).toBeTruthy();
      expect(tool.description).toBeTruthy();
    }
  });
});
