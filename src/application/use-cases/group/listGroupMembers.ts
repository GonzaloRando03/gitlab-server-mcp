import { GroupService } from "@/application/services/groupService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabGroupMember } from "@/domain/group/gitlabGroup";

export class ListGroupMembers extends BaseUseCase<
  { groupId: number | string; page?: number; perPage?: number },
  GitLabGroupMember[]
> {
  groupService: GroupService;

  constructor(groupService: GroupService) {
    super();
    this.groupService = groupService;
  }

  override execute(
    params: { groupId: number | string; page?: number; perPage?: number },
  ): Promise<GitLabGroupMember[]> {
    return this.groupService.listGroupMembers(params.groupId, {
      page: params.page,
      perPage: params.perPage,
    });
  }
}
