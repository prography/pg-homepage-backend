import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionCreateDto } from './dto/create-question.dto';
import { QuestionPutDto, SelectOptionPutDto } from './dto/put-question.dto';
import { QuestionGetDto } from './dto/response-question.dto';
import { QuestionService } from './question.service';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/')
  async createQuestion(
    @Body() questionCreateDto: QuestionCreateDto,
  ): Promise<QuestionGetDto> {
    return null;
  }

  @Get('/')
  async getAllQuestions(
    @Query('generation') generation: string,
  ): Promise<QuestionGetDto[]> {
    return null;
  }

  @Put('/:questionId')
  async putQuestion(@Body() questionPutDto: QuestionPutDto) {}

  @Put('/:questionId/:optionId')
  async putOption(@Body() optionPutDto: SelectOptionPutDto) {}

  @Delete('/:questionId')
  async deleteQuestion() {}

  @Delete('/:questionId/:optionId')
  async deleteOption() {}
}
