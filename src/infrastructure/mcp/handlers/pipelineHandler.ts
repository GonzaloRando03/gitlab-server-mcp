import { AppContainer } from "@/infrastructure/mcp/container";
import { ListPipelines } from "@/application/use-cases/pipeline/listPipelines";
import { TriggerPipeline } from "@/application/use-cases/pipeline/triggerPipeline";
import { RetryPipeline } from "@/application/use-cases/pipeline/retryPipeline";
import { ListJobs } from "@/application/use-cases/pipeline/listJobs";

export async function handlePipeline(
  name: string,
  args: Record<string, unknown>,
  c: Pick<AppContainer, "listPipelines" | "triggerPipeline" | "retryPipeline" | "listJobs">,
): Promise<unknown> {
  switch (name) {
    case "list_pipelines":
      return c.listPipelines.handle(args as Parameters<ListPipelines["handle"]>[0]);
    case "trigger_pipeline":
      return c.triggerPipeline.handle(args as Parameters<TriggerPipeline["handle"]>[0]);
    case "retry_pipeline":
      return c.retryPipeline.handle(args as Parameters<RetryPipeline["handle"]>[0]);
    case "list_jobs":
      return c.listJobs.handle(args as Parameters<ListJobs["handle"]>[0]);
    default:
      return null;
  }
}
