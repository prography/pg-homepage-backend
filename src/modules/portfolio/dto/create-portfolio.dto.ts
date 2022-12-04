import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PortfolioControllerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6팀',
    description: '팀명',
    required: true,
  })
  readonly teamName: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: `["신성환","정유진","강동하","송은우","이한나","이재준"]`,
    description: '멤버',
    required: true,
    isArray: true,
  })
  readonly teamMembers: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'pilit',
    description: '프로젝트명',
    required: true,
  })
  readonly projectName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '알약 복용여부를 확인해주는 서비스 입니다.',
    description: '프로젝트 설명',
    required: true,
  })
  readonly projectDescription: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: `["React","Spring","Nest.js"]`,
    description: '프레임워크 종류',
    required: true,
    isArray: true,
  })
  readonly frameworks: string[];
}

export class PortfolioCreateDto extends PortfolioControllerDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '3',
    description: '기수 고유번호',
    required: true,
  })
  readonly generationId: number;
}
