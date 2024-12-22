import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ParkingSpacesService } from 'src/parking-spaces/parking-spaces.service';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles-guard';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  
  @UseGuards(AuthGuardJwt,RolesGuard)
  @ApiOperation({ summary: 'Get all reservations' }) 
  @ApiResponse({ status: 200, description: 'Return all reservations.' })
  @Roles(Role.Admin)
  @Get()
  async findAll(){
    return await this.reservationService.getReservationsInfo();
  }

  @UseGuards(AuthGuardJwt,RolesGuard)
  @ApiOperation({ summary: 'Get reservation by ID' }) 
  @ApiResponse({ status: 200, description: 'Return a reservation.' }) 
  @ApiResponse({ status: 404, description: 'Reservation not found.' })
  @Roles(Role.Admin)
  @Get(':id')
  async findById(@Param('id' , ParseIntPipe) id: number ) {
      return await this.reservationService.getReservationById(id);
  }

  @UseGuards(AuthGuardJwt,RolesGuard)
  @UseGuards(AuthGuardJwt)
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'The reservation has been successfully created.' })
  @Roles(Role.User)
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @UseGuards(AuthGuardJwt,RolesGuard)
  @ApiOperation({ summary: 'Update reservation' }) 
  @ApiResponse({ status: 200, description: 'The reservation has been successfully updated.' })
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
  @Param('id' , ParseIntPipe) id: number , 
  @Body() updateReservationDto: UpdateReservationDto ){
     return await this.reservationService.updateReservation(id,updateReservationDto);
  }
 

  @UseGuards(AuthGuardJwt,RolesGuard)
  @ApiOperation({ summary: 'Delete reservation' }) 
  @ApiResponse({ status: 200, description: 'The reservation has been successfully deleted.' })
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id' , ParseIntPipe) id: number){
    return await this.reservationService.removeReservation(id);
  }


}
