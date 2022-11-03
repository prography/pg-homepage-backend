import { AwsRepository } from '@modules/aws/repository/aws.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PortfolioGetResponseDto } from '../dto/reponse-portfolio.dto';
import { PortfolioRepository } from '../repository/portfolio.repository';

export type PortfolioServiceDto = {
  generationId: number;
  projectDescription: string;
  projectName: string;
  teamMembers: string;
  teamName: string;
};

@Injectable()
export class PortfolioService {
  constructor(
    private portfolioRepository: PortfolioRepository,
    private awsRepository: AwsRepository,
  ) {}

  async findAllPortfolio(): Promise<PortfolioGetResponseDto[]> {
    return await this.portfolioRepository.findAll();
  }
  async findPortfolioById(
    portfolioId: number,
  ): Promise<PortfolioGetResponseDto> {
    return await this.portfolioRepository.findById(portfolioId);
  }
  async savePortfolio(
    {
      generationId,
      projectName,
      projectDescription,
      teamName,
      teamMembers,
    }: PortfolioServiceDto,
    files: Array<Express.Multer.File>,
  ) {
    const imageUrls: string[] = [];
    for (const imgFile of files) {
      const imageUrl = await this.awsRepository.uploadPortfolioImageFileForS3(
        imgFile,
      );
      imageUrls.push(imageUrl.imageUrl);
    }
    const createResult = await this.portfolioRepository.createOrNull({
      imageUrl: JSON.stringify(imageUrls),
      generationId,
      projectName,
      projectDescription,
      teamName,
      teamMembers,
    });
    if (!createResult) {
      throw new HttpException(
        '없는 기수이거나 저장에 실패하였습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return createResult;
  }
}
