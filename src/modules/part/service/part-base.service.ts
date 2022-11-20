import { Injectable } from '@nestjs/common';
import { PartRepository } from '../repository/part.repository';

@Injectable()
export class PartBaseService {
  constructor(private readonly partRepository: PartRepository) {}

  async fromPartIdToSelectOptions(partId: number) {
    return this.partRepository
      .createQueryBuilder('part')
      .where('part.id = :partId', { partId })
      .leftJoinAndSelect('part.partsQuestions', 'partQuestions')
      .leftJoinAndSelect('partQuestions.question', 'question')
      .leftJoinAndSelect('question.selectOptions', 'selectOptions')
      .getOne();
  }
}
