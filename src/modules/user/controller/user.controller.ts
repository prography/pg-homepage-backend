import { Auth } from '@modules/auth/Auth';
import { Role } from '@modules/auth/role/roles.enum';
import { RequestWithToken, TokenType } from '@modules/auth/role/rolesType';
import { ErrorDto } from '@modules/common/dto/error.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from 'src/infra/entity/Users.entity';
import { UserCreateDto } from '../dto/create-user.dto';
import {
  UserAuthDto,
  UserChangedResultDto,
  UserPutDto,
} from '../dto/put-user.dto';
import { UserAdminService } from '@modules/user/service';
import { UserService } from '@modules/user/service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAdminService: UserAdminService,
  ) {}

  @ApiOperation({ summary: '사용자를 생성합니다' })
  @ApiForbiddenResponse({
    description: '이미 있는 사용자 입니다',
    type: ErrorDto,
  })
  @Post('/')
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<Users> {
    return this.userService.userCreate(userCreateDto);
  }

  @ApiOperation({ summary: '사용자로 로그인합니다' })
  @ApiForbiddenResponse({
    description: '존재하지 않는 사용자 입니다',
    type: ErrorDto,
  })
  @Post('/login')
  async login(@Body() userCreateDto: UserCreateDto): Promise<UserAuthDto> {
    return this.userService.login(userCreateDto);
  }

  @ApiOperation({
    summary: '사용자의 개인정보를 변경합니다',
    description: '등록한 사용자이거나, 어드민만 변경 가능합니다',
  })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 사용자 입니다',
    type: ErrorDto,
  })
  @ApiNotFoundResponse({
    description: '존재하지 않거나 본인이 아닙니다',
    type: ErrorDto,
  })
  @Auth(Role.Admin, Role.User)
  @Put('/:userId')
  async putUser(
    @Req() req: RequestWithToken,
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() userPutDto: UserPutDto,
  ): Promise<UserChangedResultDto> {
    if (this.isAdmin(req.user)) {
      return await this.userAdminService.update(userId, userPutDto);
    }
    return await this.userService.update(userPutDto, req.user, userId);
  }

  @ApiOperation({
    summary: '사용자를 제거합니다',
    description: '어드민 전용 api',
  })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 사용자 입니다',
    type: ErrorDto,
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 사용자입니다',
    type: ErrorDto,
  })
  @Auth(Role.Admin)
  @Delete('/:userId')
  async deleteUser(
    @Param('userId') userId: number,
  ): Promise<UserChangedResultDto> {
    return await this.userAdminService.delete(userId);
  }

  @ApiOperation({
    summary: '사용자의 데이터를 조회합니다',
    description: '로그인 되어있는 user의 정보를 조회합니다',
  })
  @Auth(Role.Admin, Role.User)
  @Get('/:userId')
  async findUser(
    @Req() { user }: RequestWithToken,
    @Param('userId', new ParseIntPipe()) userId: number,
  ) {
    if (this.isAdmin(user)) {
      return await this.userAdminService.findUser(userId);
    }
    return await this.userService.findUser(user, userId);
  }

  private isAdmin(tokenType: TokenType): boolean {
    return tokenType.roles.includes(Role.Admin);
  }
}
