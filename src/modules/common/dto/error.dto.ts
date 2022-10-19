import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({ description: '상태코드', example: '상태코드' })
  statusCode: number;
  @ApiProperty({ description: '발생시간', example: `현재시간` })
  timestamp: string;
  @ApiProperty({ description: '요청경로', example: `API 경로` })
  path: string;
  @ApiProperty({ description: '오류명', example: '오류 설명' })
  message: string | HttpStatus.INTERNAL_SERVER_ERROR;
}
