import { AppContainer } from "@/infrastructure/mcp/container";
import { ListProjects } from "@/application/use-cases/project/listProjects";
import { ListGroupProjects } from "@/application/use-cases/project/listGroupProjects";
import { GetProject } from "@/application/use-cases/project/getProject";
import { ListBranches } from "@/application/use-cases/project/listBranches";
import { ListCommits } from "@/application/use-cases/project/listCommits";

export async function handleProject(
  name: string,
  args: Record<string, unknown>,
  c: Pick<
    AppContainer,
    | "listProjects"
    | "listGroupProjects"
    | "getProject"
    | "listBranches"
    | "listCommits"
  >,
): Promise<unknown> {
  switch (name) {
    case "list_projects":
      return c.listProjects.handle(
        args as Parameters<ListProjects["handle"]>[0],
      );
    case "list_group_projects":
      return c.listGroupProjects.handle(
        args as Parameters<ListGroupProjects["handle"]>[0],
      );
    case "get_project":
      return c.getProject.handle(
        args.projectId as Parameters<GetProject["handle"]>[0],
      );
    case "list_branches":
      return c.listBranches.handle(
        args as Parameters<ListBranches["handle"]>[0],
      );
    case "list_commits":
      return c.listCommits.handle(args as Parameters<ListCommits["handle"]>[0]);
    default:
      return null;
  }
}
