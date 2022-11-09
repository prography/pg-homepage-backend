import { JwtAuthGuard } from '@modules/auth/jwt/guard/jwt.guard';
import { ErrorDto } from '@modules/common/dto/error.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GenerationCreateDto } from '../dto/create-generation.dto';
import {
  GenerationDeleteResponseDto,
  GenerationGetCurrentResponseDto,
  GenerationGetResponseDto,
  GenerationPutResponseDto,
} from '../dto/reponse-generation.dto';
import { GenerationPutDto } from '../dto/update-generation.dto';
import { GenerationService } from '../service/generation.service';

@Controller({
  path: 'generations',
})
@ApiTags('Generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Get()
  @ApiOperation({ summary: '전체 기수 조회' })
  @ApiOkResponse({ type: GenerationGetResponseDto, isArray: true })
  async generationSelectAll() {
    return await this.generationService.findAllGeneration();
  }

  @Get('/current')
  @ApiOperation({ summary: '활동 기수 조회' })
  @ApiOkResponse({
    description: 'isActive는 활동기간 여부, isApplying은 지원기간 여부를 뜻함',
    type: GenerationGetCurrentResponseDto,
  })
  @ApiNotFoundResponse({
    description: '현재 활동 기수가 없습니다. ',
    type: ErrorDto,
  })
  async generationSelectOneByCurrentDate() {
    const findResult =
      await this.generationService.findOneGenerationByCurrentDate();
    if (!findResult) {
      throw new HttpException('활동 기수가 없습니다.', HttpStatus.NOT_FOUND);
    }
    return findResult;
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 기수 조회' })
  @ApiOkResponse({ type: GenerationGetResponseDto })
  @ApiNotFoundResponse({ description: '해당 기수가 없음', type: ErrorDto })
  async generationSelectOne(@Param('id') id: number) {
    const findResult = await this.generationService.findOneGenerationById(id);
    if (!findResult) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return findResult;
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '기수 등록' })
  @ApiOkResponse({ type: GenerationCreateDto })
  async generationCreate(@Body() createGenerationDto: GenerationCreateDto) {
    return await this.generationService.saveGeneration(createGenerationDto);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '특정 기수 수정' })
  @ApiOkResponse({
    description: 'affected는 변경된 row의 갯수',
    type: GenerationPutResponseDto,
  })
  @ApiNotFoundResponse({ description: '해당 기수가 없음', type: ErrorDto })
  async update(
    @Param('id') id: number,
    @Body() putGenerationDto: GenerationPutDto,
  ) {
    return await this.generationService.updateGenerationById(
      id,
      putGenerationDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '특정 기수 제거' })
  @ApiOkResponse({
    description: 'affected는 변경된 row의 갯수',
    type: GenerationDeleteResponseDto,
  })
  @ApiNotFoundResponse({ description: '해당 기수가 없음', type: ErrorDto })
  async remove(@Param('id') id: number) {
    const deleteResult = await this.generationService.deleteGenerationById(id);
    if (deleteResult.affected < 1) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return deleteResult;
  }
}
