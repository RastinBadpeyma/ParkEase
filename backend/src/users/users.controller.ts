import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('users')
@UseGuards(AuthGuardJwt,RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' }) 
  @ApiResponse({ status: 200, description: 'Return all users' })
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

}
