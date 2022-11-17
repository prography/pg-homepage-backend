import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async userCreate(userCreateDto: UserCreateDto) {
    const user = await this.userRepository.findWithOptions(userCreateDto);
    console.log(user);
    if (user) {
      throw new BadRequestException('이미 존재하는 사용자입니다');
    }
    return await this.userRepository.save(userCreateDto);
  }

  async login(userCreateDto: UserCreateDto) {
    const user = await this.userRepository.findWithOptions(userCreateDto);
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다');
    }
    return {
      token: this.jwtService.sign({ id: user.id }),
      user,
    };
  }
}
