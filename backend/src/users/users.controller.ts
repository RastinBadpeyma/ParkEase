import { ClassSerializerInterceptor,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,UseInterceptors, SerializeOptions, ParseIntPipe  } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuardJwt } from './../auth/guards/auth-guard.jwt';
import { RolesGuard } from './../auth/guards/roles-guard';
import { Roles } from './../auth/decorators/roles.decorator';
import { Role } from './../auth/enums/roles.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('users')
 @UseGuards(AuthGuardJwt,RolesGuard)
 @SerializeOptions({ strategy: 'excludeAll' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' }) 
  @ApiResponse({ status: 200, description: 'Return all users' })
  @Roles(Role.Admin)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'Get user by ID'})
  @ApiResponse({status:200, description: 'Return user by ID'})
  @Roles(Role.Admin)
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findById(@Param('id' , ParseIntPipe) id: number) {
      return this.usersService.findUserById(id);
  }

}
