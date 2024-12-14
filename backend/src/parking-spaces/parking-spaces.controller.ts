import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ParkingSpacesService } from './parking-spaces.service';
import { CreateParkingSpaceDto } from './dto/create.parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update.parking-space.dto';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('parking-space')
export class ParkingSpacesController {
   constructor(
    private readonly parkingSpacesService: ParkingSpacesService
   ){}

   @UseGuards(AuthGuardJwt)
   @ApiOperation({summary: 'Create a new parking-space'})
   @ApiResponse({status: 201, description: 'The parking-space has been successfully created'})
   @Post()
   async createParking(@Body() createParkingSpaceDto: CreateParkingSpaceDto){
      return await this.parkingSpacesService.createParkingSpace(createParkingSpaceDto);
   }

   @UseGuards(AuthGuardJwt)
   @ApiOperation({summary: 'Get all parking-spaces'})
   @ApiResponse({status:200 , description: 'Return all parking-spaces'})
   @Get()
   async getAllSpace(){
      return await this.parkingSpacesService.findAll()
   }

   @UseGuards(AuthGuardJwt)
   @ApiOperation({summary: 'Get parking-space by ID'})
   @ApiResponse({ status: 200, description: 'Return a parking-space.' }) 
   @ApiResponse({ status: 404, description: 'parking-space not found.' }) 
   @Get(':id')
   async getOne(@Param('id' ,ParseIntPipe ) id: number){
      return await this.parkingSpacesService.findOne(id);
   }

   @UseGuards(AuthGuardJwt)
   @ApiOperation({summary: 'Update parking-space'})
   @ApiResponse({status: 200, description: 'The parking-space has been successfully updated '})
   @Patch(':id')
   async update(
      @Param('id' , ParseIntPipe) id: number, 
      @Body() updateParkinSpaceDto: UpdateParkingSpaceDto
      ) {
       return await this.parkingSpacesService.update(id,updateParkinSpaceDto);
   }

   @UseGuards(AuthGuardJwt)
   @ApiOperation({summary: 'Delete parking-space'})
   @ApiResponse({status: 200 , description: 'The parking-space has been successfully updated'})
   @Delete(':id')
   async deleteOne(@Param('id',ParseIntPipe) id: number) {
     await this.parkingSpacesService.delete(+id); 
     return 'Parking space deleted successfully!';
   }

   
}
