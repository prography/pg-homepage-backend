import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserChangedResultDto, UserPutDto } from '../dto/put-user.dto';
import { UserRepository } from '../repository/user.repository';

export type AdminType = {
  isAdmin: true;
};
@Injectable()
export class UserAdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async delete(userId: number): Promise<UserChangedResultDto> {
    const updateResult = await this.userRepository.delete(userId);
    return { affected: updateResult.affected };
  }

  async update(userId: number, userPutDto: UserPutDto) {
    if (!(await this.checkExistUser(userId))) {
      throw new ForbiddenException('사용자가 잘못된 데이터에 접근했습니다');
    }
    const updateResult = await this.userRepository.update(userId, userPutDto);
    return { affected: updateResult.affected };
  }

  private async checkExistUser(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }
}
