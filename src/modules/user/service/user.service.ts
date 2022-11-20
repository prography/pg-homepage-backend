import { Role } from '@modules/auth/role/roles.enum';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '../controller/user.controller';
import { UserCreateDto } from '../dto/create-user.dto';
import { UserPutDto } from '../dto/put-user.dto';
import { UserBaseService } from './user-base.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userBaseService: UserBaseService,
    private readonly jwtService: JwtService,
  ) {}

  async userCreate(userCreateDto: UserCreateDto) {
    const user = await this.userBaseService.findWithOptions(userCreateDto);
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다');
    }
    return await this.userBaseService.save(userCreateDto);
  }

  async login(userCreateDto: UserCreateDto) {
    const user = await this.userBaseService.findWithOptions(userCreateDto);
    if (!user) {
      throw new ForbiddenException('존재하지 않는 사용자입니다');
    }
    return {
      token: this.jwtService.sign({ roles: [Role.User], userId: user.id }),
      user,
    };
  }

  async update(userUpdateDto: UserPutDto, userType: TokenType, id: number) {
    this.validateId(userType, id);
    if (!(await this.checkExistUser(id))) {
      throw new ForbiddenException('사용자가 잘못된 데이터에 접근했습니다');
    }
    const updateResult = await this.userBaseService.update(id, userUpdateDto);
    return { affected: updateResult.affected };
  }

  private validateId(userType: TokenType, id: number): void {
    if (userType?.userId != id) {
      throw new ForbiddenException('사용자가 잘못된 데이터에 접근했습니다');
    }
  }

  private async checkExistUser(userId: number) {
    return await this.userBaseService.findById(userId);
  }
}
