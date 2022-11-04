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
