import { Module } from '@nestjs/common';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { QuestionRepository } from './repositories/question.repository';
import { PartRepository } from '@modules/part/repository/part.repository';
import { PartQuestionRepository } from './repositories/parts-questions.repository';
import { SelectOptionsRepository } from './repositories/select-options.repository';

@Module({
  controllers: [QuestionController],
  providers: [
    QuestionService,
    QuestionRepository,
    PartRepository,
    PartQuestionRepository,
    SelectOptionsRepository,
  ],
})
export class QuestionModule {}
