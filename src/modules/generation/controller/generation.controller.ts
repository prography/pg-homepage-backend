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
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GenerationCreateDto } from '../dto/create-generation.dto';
import {
  GenerationDeleteResponseDto,
  GenerationGetResponseDto,
} from '../dto/reponse-generation.dto';
import { GenerationUpdateDto } from '../dto/update-generation.dto';
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
    return await this.generationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 기수 조회' })
  @ApiOkResponse({ type: GenerationGetResponseDto })
  @ApiNotFoundResponse({ description: '해당 기수가 없음', type: ErrorDto })
  async generationSelectOne(@Param('id') id: number) {
    const findResult = await this.generationService.findById(id);
    if (!findResult) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return findResult;
  }

  @Post()
  @ApiOperation({ summary: '기수 등록' })
  @ApiOkResponse({ type: GenerationCreateDto })
  async generationCreate(@Body() createGenerationDto: GenerationCreateDto) {
    return await this.generationService.create(createGenerationDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '특정 기수 수정' })
  @ApiNotFoundResponse({ description: '해당 기수가 없음', type: ErrorDto })
  async update(
    @Param('id') id: number,
    @Body() updateGenerationDto: GenerationUpdateDto,
  ) {
    return await this.generationService.updateById(id, updateGenerationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '특정 기수 제거' })
  @ApiOkResponse({
    description: 'affected는 제거된 row의 갯수',
    type: GenerationDeleteResponseDto,
  })
  @ApiNotFoundResponse({ description: '해당 기수가 없음', type: ErrorDto })
  async remove(@Param('id') id: number) {
    const deleteResult = await this.generationService.deleteById(id);
    if (deleteResult.affected < 1) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return deleteResult;
  }
}
