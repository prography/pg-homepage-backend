import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/guard/jwt.guard';
import { Roles } from './role/roles.decorator';
import { Role } from './role/roles.enum';
import { RolesGuard } from './role/roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
    ApiBearerAuth('access-token'),
  );
}
