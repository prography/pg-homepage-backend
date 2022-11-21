import { BadRequestException, Injectable } from '@nestjs/common';
import { PartRepository } from '../repository/part.repository';

@Injectable()
export class PartBaseService {
  constructor(private readonly partRepository: PartRepository) {}

  async fromPartIdToSelectOptionsOrThrow(partId: number) {
    const part = await this.partRepository
      .createQueryBuilder('part')
      .where('part.id = :partId', { partId })
      .leftJoinAndSelect('part.partsQuestions', 'partQuestions')
      .leftJoinAndSelect('partQuestions.question', 'question')
      .leftJoinAndSelect('question.selectOptions', 'selectOptions')
      .getOne();
    if (!part) {
      throw new BadRequestException('존재하지 않는 파트입니다');
    }
    return part;
  }
}
