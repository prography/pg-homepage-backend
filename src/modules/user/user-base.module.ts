import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { UserBaseService } from './service/user-base.service';

@Module({
  providers: [UserRepository, UserBaseService],
  exports: [UserBaseService],
})
export class UserBaseModule {}
