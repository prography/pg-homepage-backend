import { Injectable } from '@nestjs/common';
import { Generations } from 'src/infra/entity/Generations.entity';
import { GenerationRepository } from '../repository/generation.repository';

export type GenerationStructure = {
  applicationStart: Date;
  applicationEnd: Date;
  activityStart: Date;
  activityEnd: Date;
  name: string;
};

@Injectable()
export class GenerationService {
  constructor(private generationRepository: GenerationRepository) {}

  async findAll() {
    return await this.generationRepository.find();
  }

  async findById(id: number) {
    this.generationRepository;
    return await this.generationRepository.findOneBy({ id: id });
  }

  async create({
    name,
    applicationStart,
    applicationEnd,
    activityStart,
    activityEnd,
  }: GenerationStructure): Promise<Generations> {
    return await this.generationRepository.save({
      name,
      applicationStart,
      applicationEnd,
      activityStart,
      activityEnd,
    });
  }

  async updateById(
    id: number,
    {
      name,
      applicationStart,
      applicationEnd,
      activityStart,
      activityEnd,
    }: GenerationStructure,
  ) {
    return await this.generationRepository.save({
      name,
      applicationStart,
      applicationEnd,
      activityStart,
      activityEnd,
    });
  }

  async deleteById(id: number) {
    return await this.generationRepository.delete({ id });
  }
}
