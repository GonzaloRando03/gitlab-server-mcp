import { AppContainer } from "@/infrastructure/mcp/container";
import { ListGroups } from "@/application/use-cases/group/listGroups";
import { ListGroupMembers } from "@/application/use-cases/group/listGroupMembers";
import { GetGroup } from "@/application/use-cases/group/getGroup";

export async function handleGroup(
  name: string,
  args: Record<string, unknown>,
  c: Pick<AppContainer, "listGroups" | "listGroupMembers" | "getGroup">,
): Promise<unknown> {
  switch (name) {
    case "list_groups":
      return c.listGroups.handle(args as Parameters<ListGroups["handle"]>[0]);
    case "list_group_members":
      return c.listGroupMembers.handle(
        args as Parameters<ListGroupMembers["handle"]>[0],
      );
    case "get_group":
      return c.getGroup.handle(
        args.groupId as Parameters<GetGroup["handle"]>[0],
      );
    case "get_groups_by_name":
      return c.listGroups.handle({
        search: args.name as string,
        page: args.page as number | undefined,
        perPage: args.perPage as number | undefined,
        orderBy: args.orderBy as string | undefined,
        sort: args.sort as string | undefined,
        minAccessLevel: args.minAccessLevel as number | undefined,
      });
    default:
      return null;
  }
}
