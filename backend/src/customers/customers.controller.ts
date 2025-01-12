import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from './../auth/decorators/roles.decorator';
import { Role } from './../auth/enums/roles.enum';
import { AuthGuardJwt } from './../auth/guards/auth-guard.jwt';
import { RolesGuard } from './../auth/guards/roles-guard';
import { ReservationService } from './../reservation/reservation.service';


@Controller('customers')
 @UseGuards(AuthGuardJwt,RolesGuard)
export class CustomersController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({ summary: 'Get all customers' }) 
  @ApiResponse({ status: 200, description: 'Return all customers.' })
  @Roles(Role.Admin)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return  this.reservationService.getUsersWithReservations();
  }

}
