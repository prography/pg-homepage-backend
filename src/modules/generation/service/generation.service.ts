import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  GenerationDeleteResponseDto,
  GenerationGetCurrentResponseDto,
  GenerationGetResponseDto,
  GenerationPutResponseDto,
} from '../dto/reponse-generation.dto';
import { GenerationRepository } from '../repository/generation.repository';

export type GenerationServiceDto = {
  applicationStart: Date;
  applicationEnd: Date;
  activityStart: Date;
  activityEnd: Date;
  name: string;
};

@Injectable()
export class GenerationService {
  constructor(private generationRepository: GenerationRepository) {}

  async findAllGeneration(): Promise<GenerationGetResponseDto[]> {
    return await this.generationRepository.findAll();
  }

  async findOneGenerationByCurrentDate(): Promise<GenerationGetCurrentResponseDto> {
    const currentTime = new Date();
    const convertTime = moment(currentTime).utc().format('YYYY-MM-DD');
    const currentDate: Date = new Date(convertTime);
    const currentGenerationState = { isActive: false, isApplying: false };
    const currentGeneration = await this.generationRepository.findOneByDate(
      currentDate,
    );
    if (!currentGeneration) {
      return null;
    }
    if (
      this.isActive(
        currentDate,
        currentGeneration.applicationStart,
        currentGeneration.applicationEnd,
      )
    ) {
      currentGenerationState.isApplying = true;
    }
    if (
      this.isActive(
        currentDate,
        currentGeneration.activityStart,
        currentGeneration.activityEnd,
      )
    ) {
      currentGenerationState.isActive = true;
    }

    return { ...currentGeneration, ...currentGenerationState };
  }

  private isActive(currentDate: Date, startDate: Date, endDate: Date): boolean {
    if (
      this.changeDay(startDate, -1) <= currentDate &&
      currentDate <= this.changeDay(endDate, +1)
    ) {
      return true;
    }
    return false;
  }

  private changeDay(targetDate: Date, count: number): Date {
    const date = new Date(targetDate);
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + count,
    );
  }

  async findOneGenerationById(id: number): Promise<GenerationGetResponseDto> {
    return await this.generationRepository.findOneById(id);
  }

  async saveGeneration({
    name,
    applicationStart,
    applicationEnd,
    activityStart,
    activityEnd,
  }: GenerationServiceDto): Promise<GenerationGetResponseDto> {
    return await this.generationRepository.create({
      name,
      applicationStart,
      applicationEnd,
      activityStart,
      activityEnd,
    });
  }

  async updateGenerationById(
    id: number,
    {
      name,
      applicationStart,
      applicationEnd,
      activityStart,
      activityEnd,
    }: GenerationServiceDto,
  ): Promise<GenerationPutResponseDto> {
    const updateResult: UpdateResult =
      await this.generationRepository.updateById(id, {
        name,
        applicationStart,
        applicationEnd,
        activityStart,
        activityEnd,
      });
    if (!updateResult.affected || updateResult.affected < 1) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return { affected: updateResult.affected };
  }

  async deleteGenerationById(id: number): Promise<GenerationDeleteResponseDto> {
    const deleteResult: DeleteResult =
      await this.generationRepository.deleteById(id);
    if (!deleteResult.affected || deleteResult.affected < 1) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return { affected: deleteResult.affected };
  }
}
