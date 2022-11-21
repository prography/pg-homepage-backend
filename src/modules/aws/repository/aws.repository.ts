import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

export type AwsRepositoryResponseDto = {
  imageUrl: string;
};

export type AwsRepositoryRequestDto = {
  bucketName: string;
  objectName: string;
};

@Injectable()
export class AwsRepository {
  constructor(private configService: ConfigService) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadPortfolioImageFileForS3(
    { bucketName, objectName }: AwsRepositoryRequestDto,
    file: Express.Multer.File,
  ): Promise<AwsRepositoryResponseDto> {
    const FILE_NAME = `${Date.now() + file.originalname}`;
    try {
      await new AWS.S3()
        .putObject({
          Key: FILE_NAME,
          Body: file.buffer,
          Bucket: `${bucketName}/${objectName}`,
          ACL: 'public-read',
        })
        .promise();
      return {
        imageUrl: `https://${bucketName}.s3.ap-northeast-2.amazonaws.com/${objectName}/${FILE_NAME}`,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async deletePortfolioImageFileForS3(
  //   fileName: string,
  //   { bucketName, objectName }: AwsRepositoryRequestDto,
  // ) {
  //   try {
  //     return await new AWS.S3()
  //       .deleteObject({
  //         Key: fileName,
  //         Bucket: `${bucketName}/${objectName}`,
  //       })
  //       .promise();
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
