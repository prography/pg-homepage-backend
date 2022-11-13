import { Module } from '@nestjs/common';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { QuestionRepository } from './question/question.repository';
import { PartRepository } from '@modules/part/repository/part.repository';
import { PartQuestionRepository } from './question/parts-questions.repository';

@Module({
  controllers: [QuestionController],
  providers: [
    QuestionService,
    QuestionRepository,
    PartRepository,
    PartQuestionRepository,
  ],
})
export class QuestionModule {}
