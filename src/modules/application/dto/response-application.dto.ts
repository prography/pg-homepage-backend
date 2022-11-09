import { ApiProperty } from '@nestjs/swagger';
import { ApplicationCreateDto } from './create-application.dto';

export class ApplicationGetResponseDto extends ApplicationCreateDto {
  @ApiProperty({
    description: '질문서 id',
  })
  applicationId: number;
}
