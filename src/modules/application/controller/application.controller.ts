import { Auth } from '@modules/auth/Auth';
import { Role } from '@modules/auth/role/roles.enum';
import { RequestWithToken, TokenType } from '@modules/auth/role/rolesType';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Applications } from 'src/infra/entity/Applications.entity';
import { UpdateResult } from 'typeorm';
import { ApplicationCreateDto } from '../dto/create-application.dto';
import {
  ApplicationPutAllDto,
  ApplicationUpdateAllResultDto,
  ApplicationUpdateDto,
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
    @Req() { user }: RequestWithToken,
    @Param('applicationId', new ParseIntPipe()) applicationId: number,
  ): Promise<Applications> {
    if (this.isAdmin(user)) {
      return await this.applicationAdminService.findOneApplication(
        applicationId,
      );
    }
    return this.applicationService.findOneApplication(user, applicationId);
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
    description: '기수 id를 이용해 조회합니다\n\n 기본값 현재 운영중인 기수',
    name: 'generation',
  })
  @Auth(Role.Admin)
  @Get('/')
  async getApplicationWithFiltered(
    @Query('part') part?: string,
    @Query('status') status?: string,
    @Query('generation') generation?: string,
  ): Promise<Applications[]> {
    return await this.applicationAdminService.findWithQuery(
      part,
      status,
      generation,
    );
  }

  @ApiOperation({ summary: '어드민 전용 여러 게시물 상태 변경 api' })
  @Auth(Role.Admin)
  @Patch('/')
  async putApplication(
    @Body() applicationPutAllDto: ApplicationPutAllDto,
  ): Promise<ApplicationUpdateAllResultDto> {
    const result = await this.applicationAdminService.updateAllState(
      applicationPutAllDto.applications,
    );

    return {
      result: result.map(this.filterOnlyStatus),
    };
  }

  @ApiOperation({ summary: '어드민 전용 지원서 제거 기능' })
  @Auth(Role.Admin)
  @Delete('/:applicationId')
  async deleteApplication(
    @Param('applicationId', new ParseIntPipe()) applicationId: number,
  ): Promise<ApplicationUpdateDto> {
    return await this.applicationAdminService.deleteById(applicationId);
  }

  @Auth(Role.User)
  @Post('/draft')
  async createDraft(
    @Req() { user }: RequestWithToken,
    @Body() applicationCreateDto: ApplicationCreateDto,
  ): Promise<ApplicationUpdateDto> {
    return await this.applicationService.createDraftApplication(
      user,
      applicationCreateDto,
    );
  }

  private isAdmin(userToken: TokenType): boolean {
    if (userToken.roles.includes('admin')) {
      return true;
    }
    return false;
  }

  private filterOnlyStatus<T extends { status: string }>(
    data: T,
  ): { status: string } {
    return { status: data.status };
  }
}
