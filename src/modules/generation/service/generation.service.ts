import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
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

  async deleteGenerationById(id: number): Promise<GenerationPutResponseDto> {
    const deleteResult: DeleteResult =
      await this.generationRepository.deleteById(id);
    if (!deleteResult.affected || deleteResult.affected < 1) {
      throw new HttpException('없는 기수입니다.', HttpStatus.NOT_FOUND);
    }
    return { affected: deleteResult.affected };
  }
}
