import {
  Get,
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQuestionRequestDto } from '../dto/create-question.dto';
import { GetQuestionsRequestDto } from '../dto/get-questions.dto';
import { UpdateQuestionRequestDto } from '../dto/update-question.dto';
import { QuestionService } from '../service/question.service';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: '파트별 질문 목록 조회' })
  @Get()
  getQuestions(@Query() { partIds }: GetQuestionsRequestDto) {
    return this.questionService.getQuestions(partIds);
  }

  @ApiOperation({ summary: '질문 등록' })
  @Post()
  createQuestion(@Body() body: CreateQuestionRequestDto) {
    return this.questionService.createQuestion(body);
  }

  @ApiOperation({ summary: '질문 수정' })
  @Put(':id')
  updateQuestion(
    @Param('id') id: number,
    @Body() body: UpdateQuestionRequestDto,
  ) {
    return this.questionService.updateQuestion(id, body);
  }

  @ApiOperation({ summary: '질문 삭제' })
  @Delete(':id')
  deleteQuestion(@Param('id') id: number) {
    return this.questionService.deleteQuestion(id);
  }
}
