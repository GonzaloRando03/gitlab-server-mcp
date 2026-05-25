import { GroupService } from "@/application/services/groupService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabGroup } from "@/domain/group/gitlabGroup";

export class GetGroup extends BaseUseCase<number | string, GitLabGroup> {
  groupService: GroupService;

  constructor(groupService: GroupService) {
    super();
    this.groupService = groupService;
  }

  override execute(groupId: number | string): Promise<GitLabGroup> {
    return this.groupService.getGroup(groupId);
  }
}
