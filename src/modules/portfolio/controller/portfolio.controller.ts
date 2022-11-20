import { ApiMultiFile } from '@core/swagger/swagger.type';
import { Auth } from '@modules/auth/Auth';
import { Role } from '@modules/auth/role/roles.enum';
import { ErrorDto } from '@modules/common/dto/error.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PortfolioCreateDto } from '../dto/create-portfolio.dto';
import { PortfolioDeleteResponseDto } from '../dto/reponse-portfolio.dto';
import { PortfolioPutDto } from '../dto/update-portfolio.dto';
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

  @Get(':portfolioid')
  @ApiOperation({ summary: '특정 포트폴리오 조회' })
  async portfolioSelectById(@Param('portfolioid') portfolioId: number) {
    return await this.portfolioService.findPortfolioById(portfolioId);
  }

  @Post('/')
  @Auth(Role.Admin)
  @ApiOperation({ summary: '포트폴리오 저장' })
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBadRequestResponse({
    description: '없는 기수입니다.',
    type: ErrorDto,
  })
  async portfolioCreate(
    @Body() portfolioCreateDto: PortfolioCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.portfolioService.savePortfolio(portfolioCreateDto, files);
  }

  @Put(':portfolioid')
  @Auth(Role.Admin)
  @ApiOperation({ summary: '특정 포트폴리오 수정' })
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBadRequestResponse({
    description: '없는 기수입니다.',
    type: ErrorDto,
  })
  async portfolioUpdate(
    @Param('portfolioid') id: number,
    @Body() portfolioPutDto: PortfolioPutDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.portfolioService.updatePortfoiloById(
      id,
      portfolioPutDto,
      files,
    );
  }

  @Delete(':portfolioid')
  @Auth(Role.Admin)
  @ApiOperation({ summary: '특정 포트폴리오 제거' })
  @ApiOkResponse({
    description: 'affected는 변경된 row의 갯수',
    type: PortfolioDeleteResponseDto,
  })
  async portfolioDelete(@Param('portfolioid') id: number) {
    return await this.portfolioService.deletePortfoiloById(id);
  }
}
