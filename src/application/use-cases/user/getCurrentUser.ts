import { UserService } from "@/application/services/userService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabUser } from "@/domain/user/gitlabUser";

export class GetCurrentUser extends BaseUseCase<
  void,
  GitLabUser
> {
  userService: UserService;

  constructor(userService: UserService) {
    super();
    this.userService = userService;
  }

  override execute(): Promise<GitLabUser> {
    return this.userService.getCurrentUser();
  }
}
