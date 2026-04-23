import { AppContainer } from "@/infrastructure/mcp/container";
import { GetCurrentUser } from "@/application/use-cases/user/getCurrentUser";
import { ListUsers } from "@/application/use-cases/user/listUsers";

export async function handleUser(
  name: string,
  args: Record<string, unknown>,
  c: Pick<AppContainer, "getCurrentUser" | "listUsers">,
): Promise<unknown> {
  switch (name) {
    case "get_current_user":
      return c.getCurrentUser.handle();
    case "list_users":
      return c.listUsers.handle(args as Parameters<ListUsers["handle"]>[0]);
    default:
      return null;
  }
}
