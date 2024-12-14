import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ParkingSpacesService } from 'src/parking-spaces/parking-spaces.service';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  
  @UseGuards(AuthGuardJwt)
  @ApiOperation({ summary: 'Get all reservations' }) 
  @ApiResponse({ status: 200, description: 'Return all reservations.' })
  @Get()
  async findAll(){
    return await this.reservationService.getReservationsInfo();
  }

  @UseGuards(AuthGuardJwt)
  @ApiOperation({ summary: 'Get reservation by ID' }) 
  @ApiResponse({ status: 200, description: 'Return a reservation.' }) 
  @ApiResponse({ status: 404, description: 'Reservation not found.' })
  @Get(':id')
  async findById(@Param('id' , ParseIntPipe) id: number ) {
      return await this.reservationService.getReservationById(id);
  }

  @UseGuards(AuthGuardJwt)
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'The reservation has been successfully created.' })
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @UseGuards(AuthGuardJwt)
  @ApiOperation({ summary: 'Update reservation' }) 
  @ApiResponse({ status: 200, description: 'The reservation has been successfully updated.' })
  @Patch(':id')
  async update(
  @Param('id' , ParseIntPipe) id: number , 
  @Body() updateReservationDto: UpdateReservationDto ){
     return await this.reservationService.updateReservation(id,updateReservationDto);
  }
 

  @UseGuards(AuthGuardJwt)
  @ApiOperation({ summary: 'Delete reservation' }) 
  @ApiResponse({ status: 200, description: 'The reservation has been successfully deleted.' })
  @Delete(':id')
  async delete(@Param('id' , ParseIntPipe) id: number){
    return await this.reservationService.removeReservation(id);
  }


}
