import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationCreateDto } from '../dto/create-application.dto';
import { ApplicationGetResponseDto } from '../dto/response-application.dto';
import {
  ApplicationPutAllDto,
  ApplicationPutDto,
} from '../dto/update-application.dto';
import { ApplicationAdminService, ApplicationService } from '../service';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly applicationAdminService: ApplicationAdminService,
  ) {}

  @Post('/')
  async createApplication(
    @Body() applicationCreateDto: ApplicationCreateDto,
  ): Promise<ApplicationGetResponseDto> {
    return null;
  }

  @Get('/:applicationId')
  async getApplication(
    @Param('applicationId') id: string,
  ): Promise<ApplicationGetResponseDto> {
    return null;
  }

  @Get('/')
  async getApplicationWithFiltered(
    @Query('part') part: string,
    @Query('status') status: string,
  ): Promise<ApplicationGetResponseDto[]> {
    return null;
  }

  @Put('/:applicationId')
  async putApplicationId(
    @Param('applicationId') applicationId: string,
    @Body() applicationPutDto: ApplicationPutDto,
  ) {
    return null;
  }

  @Put('/')
  async putApplication(@Body() applicationPutAllDto: ApplicationPutAllDto) {
    return null;
  }

  @Delete('/:applicationId')
  async deleteApplication(@Param('applicationId') applicationId: number) {}
}
