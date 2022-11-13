import {
  Get,
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePartRequestDto } from '../dto/create-part.dto';
import { UpdatePartRequestDto } from '../dto/update-part.dto';
import { PartService } from '../service/part.service';

@ApiTags('Part')
@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @ApiOperation({ summary: '전체 파트 조회' })
  @Get()
  getParts() {
    return this.partService.getParts();
  }

  @ApiOperation({ summary: '파트 등록' })
  @Post()
  createPart(@Body() body: CreatePartRequestDto) {
    return this.partService.createPart(body);
  }

  @ApiOperation({ summary: '파트 조회' })
  @Get(':id')
  getPart(@Param('id') id: number) {
    return this.partService.getPart(id);
  }

  @ApiOperation({ summary: '파트 수정' })
  @Patch(':id')
  updatePart(@Param('id') id: number, @Body() body: UpdatePartRequestDto) {
    return this.partService.updatePart(id, body);
  }

  @ApiOperation({ summary: '파트 삭제' })
  @Delete(':id')
  deletePart(@Param('id') id: number) {
    return this.partService.deletePart(id);
  }
}