import { AppContainer } from "@/infrastructure/mcp/container";
import { ListIssues } from "@/application/use-cases/issue/listIssues";
import { GetIssue } from "@/application/use-cases/issue/getIssue";
import { CreateIssue } from "@/application/use-cases/issue/createIssue";
import { CloseIssue } from "@/application/use-cases/issue/closeIssue";
import { AddCommentToIssue } from "@/application/use-cases/issue/addCommentToIssue";

export async function handleIssue(
  name: string,
  args: Record<string, unknown>,
  c: Pick<AppContainer, "listIssues" | "getIssue" | "createIssue" | "closeIssue" | "addCommentToIssue">,
): Promise<unknown> {
  switch (name) {
    case "list_issues":
      return c.listIssues.handle(args as Parameters<ListIssues["handle"]>[0]);
    case "get_issue":
      return c.getIssue.handle(args as Parameters<GetIssue["handle"]>[0]);
    case "create_issue":
      return c.createIssue.handle(args as Parameters<CreateIssue["handle"]>[0]);
    case "close_issue":
      return c.closeIssue.handle(args as Parameters<CloseIssue["handle"]>[0]);
    case "add_comment_to_issue":
      return c.addCommentToIssue.handle(args as Parameters<AddCommentToIssue["handle"]>[0]);
    default:
      return null;
  }
}
