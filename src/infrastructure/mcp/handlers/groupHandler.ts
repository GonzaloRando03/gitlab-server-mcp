import { AppContainer } from "@/infrastructure/mcp/container";
import { ListGroups } from "@/application/use-cases/group/listGroups";
import { ListGroupMembers } from "@/application/use-cases/group/listGroupMembers";

export async function handleGroup(
  name: string,
  args: Record<string, unknown>,
  c: Pick<AppContainer, "listGroups" | "listGroupMembers">,
): Promise<unknown> {
  switch (name) {
    case "list_groups":
      return c.listGroups.handle(args as Parameters<ListGroups["handle"]>[0]);
    case "list_group_members":
      return c.listGroupMembers.handle(args as Parameters<ListGroupMembers["handle"]>[0]);
    default:
      return null;
  }
}
