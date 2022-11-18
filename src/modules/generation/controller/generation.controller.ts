import { JwtAuthGuard } from '@modules/auth/jwt/guard/jwt.guard';
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
  async update(
    @Param('id') id: number,
    @Body() putGenerationDto: GenerationPutDto,
  ) {
    const findResult = await this.generationService.findOneGenerationById(id);
    if (!findResult) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
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
  async remove(@Param('id') id: number) {
    const findResult = await this.generationService.findOneGenerationById(id);
    if (!findResult) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return await this.generationService.deleteGenerationById(id);
  }
}
