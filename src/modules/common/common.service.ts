import { TokenType } from '@modules/auth/role/rolesType';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(private readonly dataSource: DataSource) {}

  async transaction<T>(executable: () => Promise<T>) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result: T = await executable();
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      if (typeof err == 'object' && 'response' in err) {
        throw new HttpException(
          err.response.message || '입력이 잘못 되었습니다',
          err.response.statusCode || HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  isAdmin(userToken: TokenType): boolean {
    if (userToken.roles.includes('admin')) {
      return true;
    }
    return false;
  }
}
