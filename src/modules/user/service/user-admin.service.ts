import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserChangedResultDto, UserPutDto } from '../dto/put-user.dto';
import { UserBaseService } from './user-base.service';

@Injectable()
export class UserAdminService {
  constructor(private readonly userBaseService: UserBaseService) {}
  async delete(userId: number): Promise<UserChangedResultDto> {
    const updateResult = await this.userBaseService.delete(userId);
    return { affected: updateResult.affected };
  }

  async update(userId: number, userPutDto: UserPutDto) {
    if (!(await this.checkExistUser(userId))) {
      throw new ForbiddenException('사용자가 잘못된 데이터에 접근했습니다');
    }
    const updateResult = await this.userBaseService.update(userId, userPutDto);
    return { affected: updateResult.affected };
  }

  private async checkExistUser(userId: number) {
    return await this.userBaseService.findById(userId);
  }
}
