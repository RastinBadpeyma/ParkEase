import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { ReservationService } from 'src/reservation/reservation.service';


@Controller('customers')
@UseGuards(AuthGuardJwt,RolesGuard)
export class CustomersController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({ summary: 'Get all customers' }) 
  @ApiResponse({ status: 200, description: 'Return all customers.' })
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return  this.reservationService.getUsersWithReservations();
  }

}
