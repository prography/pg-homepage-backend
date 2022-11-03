import { ApiProperty } from '@nestjs/swagger';
import { PortfolioControllerDto } from './create-portfolio.dto';

class PortfolioGenerationDto {
  @ApiProperty({ description: '기수 고유번호', example: '3' })
  id: number;
  @ApiProperty({ description: '기수 이름', example: '7기' })
  name: string;
}

export class PortfolioGetResponseDto extends PortfolioControllerDto {
  @ApiProperty({ description: '포트폴리오 고유번호', example: '7' })
  id: number;
  @ApiProperty({
    description: '이미지 URL',
    example: `[\"https://pg-renewal-portfolio-images.s3.ap-northeast-2.amazonaws.com/portfolio_images/1667202502511103241850.png\"]`,
  })
  imageUrl: string;
  generation: PortfolioGenerationDto;
}
