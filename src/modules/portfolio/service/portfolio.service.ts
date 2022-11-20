import { AwsRepository } from '@modules/aws/repository/aws.repository';
import { GenerationRepository } from '@modules/generation/repository/generation.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PortfolioGetResponseDto,
  PortfolioPutResponseDto,
} from '../dto/reponse-portfolio.dto';
import { PortfolioRepository } from '../repository/portfolio.repository';

export type PortfolioServiceDto = {
  generationId: number;
  projectDescription: string;
  projectName: string;
  teamMembers: string;
  teamName: string;
  frameworks: string;
};

export const bucketName = `pg-renewal-portfolio-images`;
export const objectName = `portfolio_images`;

@Injectable()
export class PortfolioService {
  constructor(
    private portfolioRepository: PortfolioRepository,
    private generationRepository: GenerationRepository,
    private awsRepository: AwsRepository,
  ) {}

  async findAllPortfolio(): Promise<PortfolioGetResponseDto[]> {
    return await this.portfolioRepository.findAll();
  }
  async findPortfolioById(
    portfolioId: number,
  ): Promise<PortfolioGetResponseDto> {
    return await this.portfolioRepository.findOneById(portfolioId);
  }
  async savePortfolio(
    {
      generationId,
      projectName,
      projectDescription,
      teamName,
      teamMembers,
      frameworks,
    }: PortfolioServiceDto,
    files: Array<Express.Multer.File>,
  ): Promise<PortfolioGetResponseDto> {
    const generationResult = await this.generationRepository.findOneById(
      generationId,
    );
    if (!generationResult) {
      throw new BadRequestException('없는 기수입니다.');
    }
    const imageUrls: string[] = await this.uploadPortfolioImageFileAll(files);
    const createResult = await this.portfolioRepository.create({
      imageUrl: JSON.stringify(imageUrls),
      generation: generationResult,
      projectName,
      projectDescription,
      teamName,
      teamMembers,
      frameworks,
    });
    return {
      ...createResult,
      generation: {
        id: createResult.generation.id,
        name: createResult.generation.name,
      },
    };
  }

  async updatePortfoiloById(
    portfolioId: number,
    {
      generationId,
      projectName,
      projectDescription,
      teamName,
      teamMembers,
      frameworks,
    }: PortfolioServiceDto,
    files: Array<Express.Multer.File>,
  ): Promise<PortfolioPutResponseDto> {
    const generationResult = await this.generationRepository.findOneById(
      generationId,
    );
    if (!generationResult) {
      throw new BadRequestException('없는 기수입니다.');
    }
    const imageUrls: string[] = await this.uploadPortfolioImageFileAll(files);
    return await this.portfolioRepository.updateOneById(portfolioId, {
      imageUrl: JSON.stringify(imageUrls),
      generation: generationResult,
      projectName,
      projectDescription,
      teamName,
      teamMembers,
      frameworks,
    });
  }

  async deletePortfoiloById(portfolioId: number) {
    return await this.portfolioRepository.deleteOneById(portfolioId);
  }

  /**
   * @parms files - Form 태그로 받은 모든 이미지 바이너리가 Array 형태로 입력
   * @returns AWS S3주소
   */
  private async uploadPortfolioImageFileAll(
    files: Array<Express.Multer.File>,
  ): Promise<string[]> {
    const imageUrls: string[] = [];
    for (const imgFile of files) {
      const imageUrl = await this.awsRepository.uploadPortfolioImageFileForS3(
        { bucketName, objectName },
        imgFile,
      );
      imageUrls.push(imageUrl.imageUrl);
    }
    return imageUrls;
  }
}
