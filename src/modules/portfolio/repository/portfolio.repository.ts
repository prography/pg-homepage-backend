import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Generations } from 'src/infra/entity/Generations.entity';
import { Portfolios } from 'src/infra/entity/Portpolios.entity';
import { DeleteResult, Equal, Repository, UpdateResult } from 'typeorm';

export type PortfolioRepositoryDto = {
  imageUrl: string;
  teamName: string;
  teamMembers: string;
  projectName: string;
  frameworks: string;
  projectDescription: string;
  generation: Generations;
};

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectRepository(Portfolios)
    private portfolioRepository: Repository<Portfolios>,
  ) {}

  async findAll(): Promise<Portfolios[]> {
    return await this.portfolioRepository.find({
      select: {
        id: true,
        teamName: true,
        teamMembers: true,
        projectName: true,
        projectDescription: true,
        imageUrl: true,
        frameworks: true,
        generation: {
          id: true,
          name: true,
        },
      },
      relations: ['generation'],
    });
  }

  async findOneById(portfolioId: number): Promise<Portfolios> {
    return await this.portfolioRepository.findOne({
      where: { id: Equal(portfolioId) },
      select: {
        id: true,
        teamName: true,
        teamMembers: true,
        projectName: true,
        projectDescription: true,
        imageUrl: true,
        frameworks: true,
        generation: {
          id: true,
          name: true,
        },
      },
      relations: ['generation'],
    });
  }

  async create(portfolioData: PortfolioRepositoryDto): Promise<Portfolios> {
    return await this.portfolioRepository.save(portfolioData);
  }

  async updateOneById(
    id: number,
    portfolioData: PortfolioRepositoryDto,
  ): Promise<UpdateResult> {
    return await this.portfolioRepository.update(id, {
      ...portfolioData,
    });
  }

  async deleteOneById(portfolioId: number): Promise<DeleteResult> {
    return await this.portfolioRepository.delete({ id: portfolioId });
  }
}
