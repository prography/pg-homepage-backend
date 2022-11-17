import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/infra/entity/Users.entity';
import { UserCreateDto } from '../dto/create-user.dto';
import { UserPutDto } from '../dto/put-user.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '사용자를 생성합니다' })
  @Post('/')
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<Users> {
    return this.userService.userCreate(userCreateDto);
  }

  @ApiOperation({ summary: '사용자로 로그인합니다' })
  @Post('/login')
  async login(@Body() userCreateDto: UserCreateDto) {
    return this.userService.login(userCreateDto);
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<Users> {
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
