import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/infra/entity/Users.entity';
import { UpdateResult } from 'typeorm';
import { UserCreateDto } from '../dto/create-user.dto';
import { UserPutDto } from '../dto/put-user.dto';
import { UserRepository } from '../repository/user.repository';

export type UserAffectedDto = {
  affected: number;
};

@Injectable()
export class UserBaseService {
  constructor(private readonly userRepository: UserRepository) {}

  async delete(userId: number): Promise<UserAffectedDto> {
    const updateResult = await this.userRepository.delete(userId);
    return { affected: updateResult.affected };
  }

  async findWithOptions(userCreateDto: UserCreateDto): Promise<Users> {
    return this.userRepository.findWithOptions(userCreateDto);
  }

  async findById(userId: number): Promise<Users> {
    return await this.userRepository.findOneById(userId);
  }

  async update(
    userId: number,
    userUpdateDto: UserPutDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(userId, userUpdateDto);
  }

  async save(userCreateDto: UserCreateDto) {
    return await this.userRepository.save(userCreateDto);
  }

  async findUserAndApplicationsOrThrow(userId: number): Promise<Users> {
    const user = await this.userRepository.findOneByIdAndSelectApplications(
      userId,
    );
    if (!user) {
      throw new NotFoundException('없는 사용자 입니다');
    }
    return user;
  }
}
