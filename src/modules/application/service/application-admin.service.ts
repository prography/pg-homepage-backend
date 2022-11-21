import { Injectable } from '@nestjs/common';
import { Applications } from 'src/infra/entity/Applications.entity';
import { UpdateResult } from 'typeorm';
import { ApplicationStatusDto } from '../dto/update-application.dto';
import { ApplicationBaseService } from './application-base.service';

@Injectable()
export class ApplicationAdminService {
  constructor(
    private readonly applicationBaseService: ApplicationBaseService,
  ) {}
  async findOneApplication(applicationId: number): Promise<Applications> {
    return this.applicationBaseService.findById(applicationId);
  }

  async deleteById(applicationId: number) {
    return this.applicationBaseService.deleteById(applicationId);
  }

  async updateAllState(
    applicationStates: ApplicationStatusDto[],
  ): Promise<PromiseSettledResult<UpdateResult>[]> {
    return await Promise.allSettled(
      applicationStates.map((applicationState: ApplicationStatusDto) =>
        this.applicationBaseService.updateAll(applicationState.applicationId, {
          status: applicationState.status,
        }),
      ),
    );
  }

  async findWithQuery(
    partId?: string,
    status?: string,
    generationId?: string,
  ): Promise<Applications[]> {
    return await this.applicationBaseService.findWithQuery(
      partId,
      status,
      generationId,
    );
  }
}
