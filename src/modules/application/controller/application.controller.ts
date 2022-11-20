import { Auth } from '@modules/auth/Auth';
import { Role } from '@modules/auth/role/roles.enum';
import { RequestWithToken } from '@modules/auth/role/rolesType';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Applications } from 'src/infra/entity/Applications.entity';
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

  @Auth(Role.User)
  @Post('/')
  async createApplication(
    @Req() { user }: RequestWithToken,
    @Body() applicationCreateDto: ApplicationCreateDto,
  ): Promise<Applications> {
    return await this.applicationService.createFinalApplication(
      user,
      applicationCreateDto,
    );
  }

  @Get('/:applicationId')
  async getApplication(
    @Param('applicationId') id: string,
  ): Promise<Applications> {
    return null;
  }

  @Get('/')
  async getApplicationWithFiltered(
    @Query('part') part: string,
    @Query('status') status: string,
  ): Promise<Applications[]> {
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
