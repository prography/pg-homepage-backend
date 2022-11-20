import { JwtAuthGuard } from '@modules/auth/jwt/guard/jwt.guard';
import { RolesType } from '@modules/auth/role/rolesType';
import { ErrorDto } from '@modules/common/dto/error.dto';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Users } from 'src/infra/entity/Users.entity';
import { UserCreateDto } from '../dto/create-user.dto';
import {
  UserAuthDto,
  UserChangedResultDto,
  UserPutDto,
} from '../dto/put-user.dto';
import { UserAdminService } from '../service/user-admin.service';
import { UserService } from '../service/user.service';

export interface TokenType extends RolesType {
  userId?: number;
}
type RequestWithToken = Request & {
  user: TokenType;
};
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
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
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
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:userId')
  async deleteUser(
    @Req() req: RequestWithToken,
    @Param('userId') userId: number,
  ): Promise<UserChangedResultDto> {
    if (!this.isAdmin(req.user)) {
      throw new ForbiddenException('권한이 없는 사용자 입니다');
    }
    return await this.userAdminService.delete(userId);
  }

  private isAdmin(tokenType: TokenType): boolean {
    return tokenType.roles.includes('admin');
  }
}
