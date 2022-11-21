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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Applications } from 'src/infra/entity/Applications.entity';
import { ApplicationCreateDto } from '../dto/create-application.dto';
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

  @Auth(Role.Admin, Role.User)
  @Get('/:applicationId')
  async getSpecificApplication(
    @Param('applicationId') id: string,
  ): Promise<Applications> {
    return null;
  }

  @ApiQuery({
    required: false,
    description:
      '지원자의 상태를 이용해 조회합니다\n\nex) 최종 지원: finalSubmit. 임시저장: draft',
    name: 'status',
  })
  @ApiQuery({
    required: false,
    description: '파트 id를 이용해 조회합니다',
    name: 'part',
  })
  @ApiQuery({
    required: false,
    description: '기수 id를 이용해 조회합니다',
    name: 'generation',
  })
  @Auth(Role.Admin)
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

  @Auth(Role.User)
  @Post('/draft')
  async createDraft(
    @Req() { user }: RequestWithToken,
    @Body() applicationCreateDto: ApplicationCreateDto,
  ): Promise<Applications> {
    return await this.applicationService.createDraftApplication(
      user,
      applicationCreateDto,
    );
  }
}
