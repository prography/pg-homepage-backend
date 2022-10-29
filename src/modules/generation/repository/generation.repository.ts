import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Generations } from 'src/infra/entity/Generations.entity';
import {
  DeleteResult,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  UpdateResult,
} from 'typeorm';

export type GenerationRepositoryDto = {
  applicationStart: Date;
  applicationEnd: Date;
  activityStart: Date;
  activityEnd: Date;
  name: string;
};

@Injectable()
export class GenerationRepository {
  constructor(
    @InjectRepository(Generations)
    private generationRepository: Repository<Generations>,
  ) {}

  async findAll(): Promise<Generations[]> {
    return await this.generationRepository.find();
  }

  async findOneByDate(targetDate: Date): Promise<Generations> {
    const targetStartDate = new Date(targetDate);
    const targetEndDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate() - 1,
    );
    return await this.generationRepository.findOne({
      where: [
        {
          applicationStart: LessThanOrEqual(targetStartDate),
          applicationEnd: MoreThanOrEqual(targetEndDate),
        },
        {
          activityStart: LessThanOrEqual(targetStartDate),
          activityEnd: MoreThanOrEqual(targetEndDate),
        },
      ],
    });
  }

  async findOneById(id: number): Promise<Generations> {
    return await this.generationRepository.findOneBy({ id });
  }

  async create({
    name,
    applicationStart,
    applicationEnd,
    activityStart,
    activityEnd,
  }: GenerationRepositoryDto): Promise<Generations> {
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
    }: GenerationRepositoryDto,
  ): Promise<UpdateResult> {
    return await this.generationRepository.update(id, {
      name,
      applicationStart,
      applicationEnd,
      activityStart,
      activityEnd,
    });
  }
  async deleteById(id: number): Promise<DeleteResult> {
    return await this.generationRepository.delete({ id });
  }
}
