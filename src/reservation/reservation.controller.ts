import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ParkingSpacesService } from 'src/parking-spaces/parking-spaces.service';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}


  @Get(':id')
  async findById(@Param('id' , ParseIntPipe) id: number ) {
      return await this.reservationService.findReservationById(id);
  }

  @UseGuards(AuthGuardJwt)
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Patch(':id')
  async update(
  @Param('id' , ParseIntPipe) id: number , 
  @Body() updateReservationDto: UpdateReservationDto ){
     return await this.reservationService.updateReservation(id,updateReservationDto);
  }
 
  @Delete(':id')
  async delete(@Param('id' , ParseIntPipe) id: number){
    return await this.reservationService.removeReservation(id);
  }


}
