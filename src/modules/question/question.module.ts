import { Module } from '@nestjs/common';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { QuestionRepository } from './repositories/question.repository';
import { PartRepository } from '@modules/part/repository/part.repository';
import { PartQuestionRepository } from './repositories/parts-questions.repository';
import { SelectOptionsRepository } from './repositories/select-options.repository';
import { ApplicationBaseModule } from '@modules/application/application-base.module';

@Module({
  imports: [ApplicationBaseModule],
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
