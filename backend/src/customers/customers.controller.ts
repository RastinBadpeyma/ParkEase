import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReservationService } from 'src/reservation/reservation.service';


@Controller('customers')
export class CustomersController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({ summary: 'Get all customers' }) 
  @ApiResponse({ status: 200, description: 'Return all customers.' })
  @Get()
  findAll() {
    return  this.reservationService.getUsersWithReservations();
  }

}
