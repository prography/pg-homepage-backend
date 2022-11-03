import { ApiMultiFile } from '@core/swagger/swagger.type';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from '../service/portfolio.service';

@Controller({
  path: 'portfolios',
})
@ApiTags('Portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('/')
  @ApiOperation({ summary: '포트폴리오 조회' })
  async portfolioSelectAll() {
    return await this.portfolioService.findAllPortfolio();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 포트폴리오 조회' })
  async portfolioSelectById(@Param('id') portfolioId: number) {
    return await this.portfolioService.findPortfolioById(portfolioId);
  }

  @Post('/')
  @ApiOperation({ summary: '포트폴리오 저장' })
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(FilesInterceptor('files'))
  async portfolioCreate(
    @Body() portfolioCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.portfolioService.savePortfolio(portfolioCreateDto, files);
  }
}
