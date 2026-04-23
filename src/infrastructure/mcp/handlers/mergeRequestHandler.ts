import { AppContainer } from "@/infrastructure/mcp/container";
import { ListMRs } from "@/application/use-cases/merge-request/listMRs";
import { GetMR } from "@/application/use-cases/merge-request/getMR";
import { GetMRDiff } from "@/application/use-cases/merge-request/getMRDiff";
import { CreateMR } from "@/application/use-cases/merge-request/createMR";
import { ApproveMR } from "@/application/use-cases/merge-request/approveMR";
import { MergeMR } from "@/application/use-cases/merge-request/mergeMR";
import { ListMRNotes } from "@/application/use-cases/merge-request/listMRNotes";
import { CreateMRNote } from "@/application/use-cases/merge-request/createMRNote";

export async function handleMergeRequest(
  name: string,
  args: Record<string, unknown>,
  c: Pick<
    AppContainer,
    | "listMRs"
    | "getMR"
    | "getMRDiff"
    | "createMR"
    | "approveMR"
    | "mergeMR"
    | "listMRNotes"
    | "createMRNote"
  >,
): Promise<unknown> {
  switch (name) {
    case "list_mrs":
      return c.listMRs.handle(args as Parameters<ListMRs["handle"]>[0]);
    case "get_mr":
      return c.getMR.handle(args as Parameters<GetMR["handle"]>[0]);
    case "get_mr_diff":
      return c.getMRDiff.handle(args as Parameters<GetMRDiff["handle"]>[0]);
    case "create_mr":
      return c.createMR.handle(args as Parameters<CreateMR["handle"]>[0]);
    case "approve_mr":
      return c.approveMR.handle(args as Parameters<ApproveMR["handle"]>[0]);
    case "merge_mr":
      return c.mergeMR.handle(args as Parameters<MergeMR["handle"]>[0]);
    case "list_mr_notes":
      return c.listMRNotes.handle(args as Parameters<ListMRNotes["handle"]>[0]);
    case "create_mr_note":
      return c.createMRNote.handle(
        args as Parameters<CreateMRNote["handle"]>[0],
      );
    default:
      return null;
  }
}
