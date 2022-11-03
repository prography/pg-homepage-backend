import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

export type AwsRepositoryDto = {
  imageUrl: string;
};

@Injectable()
export class AwsRepository {
  constructor(private configService: ConfigService) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadPortfolioImageFileForS3(
    file: Express.Multer.File,
  ): Promise<AwsRepositoryDto> {
    const BUCKET_NAME = `pg-renewal-portfolio-images/portfolio_images`;
    const FILE_NAME = `${Date.now() + file.originalname}`;
    try {
      const upload = await new AWS.S3()
        .putObject({
          Key: FILE_NAME,
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          ACL: 'public-read',
        })
        .promise();
      return {
        imageUrl: `https://pg-renewal-portfolio-images.s3.ap-northeast-2.amazonaws.com/portfolio_images/${FILE_NAME}`,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
