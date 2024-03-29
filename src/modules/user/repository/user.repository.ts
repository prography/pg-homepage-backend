import { Injectable } from '@nestjs/common';
import { Users } from 'src/infra/entity/Users.entity';
import { DataSource, Repository } from 'typeorm';

export type UserFindOption = {
  email: string;
  name: string;
  phoneNumber: string;
};
@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(private readonly dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findWithOptions(option: UserFindOption): Promise<Users> {
    return this.dataSource
      .getRepository(Users)
      .createQueryBuilder('user')
      .where('user.name = :name', { name: option.name })
      .andWhere('user.email = :email', { email: option.email })
      .andWhere('user.phoneNumber = :phoneNumber', {
        phoneNumber: option.phoneNumber,
      })
      .getOne();
  }

  async findOneById(userId: number) {
    return await this.findOne({
      where: { id: userId },
    });
  }

  async findOneByIdAndSelectApplications(userId: number) {
    return await this.createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.applications', 'applications')
      .leftJoinAndSelect('applications.part', 'part')
      .getOne();
  }
}
