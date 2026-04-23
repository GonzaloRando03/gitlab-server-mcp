import { describe, it, expect } from "vitest";
import { createContainer } from "@/infrastructure/mcp/container";

describe("Container", () => {
  it("should create container with all use cases", () => {
    const container = createContainer({ token: "test-token" });
    expect(container).toBeDefined();
    expect(container.listProjects).toBeDefined();
    expect(container.getProject).toBeDefined();
    expect(container.listMRs).toBeDefined();
    expect(container.listIssues).toBeDefined();
    expect(container.listPipelines).toBeDefined();
    expect(container.getCurrentUser).toBeDefined();
    expect(container.listGroups).toBeDefined();
  });
});
