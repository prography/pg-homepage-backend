import { ApiProperty } from '@nestjs/swagger';
import { ApplicationCreateDto } from './create-application.dto';

export class ApplicationPutDto extends ApplicationCreateDto {}

class ApplicationPutDtoWithId extends ApplicationPutDto {
  @ApiProperty({
    description: '지원서 id',
  })
  applicationId: number;
}
export class ApplicationPutAllDto {
  applications: ApplicationPutDtoWithId[];
}

export class ApplicationUpdateDto {
  @ApiProperty({ description: '변경된 row 갯수', example: '1' })
  affected?: number;
}
