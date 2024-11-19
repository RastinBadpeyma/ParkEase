import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from 'src/reservation/reservation.service';


@Controller('customers')
export class CustomersController {
  constructor(private readonly reservationService: ReservationService) {}


  @Get()
  findAll() {
    return  this.reservationService.getUsersWithReservations();
  }

}
