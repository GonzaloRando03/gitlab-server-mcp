import { GroupService } from "@/application/services/groupService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabGroup } from "@/domain/group/gitlabGroup";

export class ListGroups extends BaseUseCase<
  { page?: number; perPage?: number; search?: string; orderBy?: string; sort?: string; minAccessLevel?: number } | undefined,
  GitLabGroup[]
> {
  groupService: GroupService;

  constructor(groupService: GroupService) {
    super();
    this.groupService = groupService;
  }

  override execute(
    params?: { page?: number; perPage?: number; search?: string; orderBy?: string; sort?: string; minAccessLevel?: number },
  ): Promise<GitLabGroup[]> {
    return this.groupService.listGroups(params);
  }
}
