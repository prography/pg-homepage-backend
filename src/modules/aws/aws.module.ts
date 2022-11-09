import { Module } from '@nestjs/common';
import { AwsRepository } from './repository/aws.repository';
@Module({
  providers: [AwsRepository],
  exports: [AwsRepository],
})
export class AwsModule {}
