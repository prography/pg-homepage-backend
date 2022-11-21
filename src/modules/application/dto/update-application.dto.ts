import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from 'src/infra/entity/Applications.entity';

export class ApplicationStatusDto {
  @IsEnum(Status)
  @ApiProperty({ enum: Object.keys(Status) })
  status: Status;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '변경 타겟 지원서 id',
  })
  applicationId: number;
}

export class ApplicationPutAllDto {
  @IsNotEmpty()
  applications: ApplicationStatusDto[];
}

export class ApplicationUpdateDto {
  @ApiProperty({ description: '변경된 row 갯수', example: '1' })
  affected?: number;
}

const StatusResult = {
  fulfilled: 'fulfilled',
  rejected: 'rejected',
} as const;
class oneUpdateStatus {
  @IsEnum(StatusResult)
  status: string;
}
export class ApplicationUpdateAllResultDto {
  result: oneUpdateStatus[];
}
