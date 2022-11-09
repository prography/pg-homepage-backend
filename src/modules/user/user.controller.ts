import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/create-user.dto';
import { UserPutDto } from './dto/put-user.dto';
import { UserGetDto } from './dto/response-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<UserGetDto> {
    return null;
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<UserGetDto> {
    return null;
  }

  @Put('/:userId')
  async putUser(
    @Body('userId') userId: string,
    @Body() userPutDto: UserPutDto,
  ) {}

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: number) {}
}
