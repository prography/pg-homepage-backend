import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PartCreateDto } from './dto/create-part.dto';
import { PartPutDto } from './dto/put-part.dto';
import { PartGetResponseDto } from './dto/response-part.dto';
import { PartService } from './part.service';

@ApiTags('Part')
@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post('/')
  async createPart(
    @Body() createPartDto: PartCreateDto,
  ): Promise<PartGetResponseDto> {
    return null;
  }

  @Get('/')
  async getAllParts(
    @Query('generation') generation?: string,
  ): Promise<PartGetResponseDto[]> {
    return null;
  }

  @Get('/:id')
  async getOnePart(@Param('id') id: number): Promise<PartGetResponseDto> {
    return null;
  }

  @Put('/:id')
  async putPart(
    @Body() body: PartPutDto,
    @Param('id') id: number,
  ): Promise<PartGetResponseDto> {
    return null;
  }

  @Delete('/:id')
  async deletePart() {}
}
