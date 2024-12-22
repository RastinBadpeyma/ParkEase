import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ParkingSpacesService } from './parking-spaces.service';
import { CreateParkingSpaceDto } from './dto/create.parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update.parking-space.dto';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@Controller('parking-space')
@UseGuards(AuthGuardJwt,RolesGuard)
export class ParkingSpacesController {
   constructor(
    private readonly parkingSpacesService: ParkingSpacesService
   ){}

   @ApiOperation({summary: 'Create a new parking-space'})
   @ApiResponse({status: 201, description: 'The parking-space has been successfully created'})
   @Roles(Role.Admin)
   @Post()
   async createParking(@Body() createParkingSpaceDto: CreateParkingSpaceDto){
      return await this.parkingSpacesService.createParkingSpace(createParkingSpaceDto);
   }

   @ApiOperation({summary: 'Get all parking-spaces'})
   @ApiResponse({status:200 , description: 'Return all parking-spaces'})
   @Roles(Role.User)
   @Get()
   async getAllSpace(){
      return await this.parkingSpacesService.findAll()
   }

   @ApiOperation({summary: 'Get parking-space by ID'})
   @ApiResponse({ status: 200, description: 'Return a parking-space.' }) 
   @ApiResponse({ status: 404, description: 'parking-space not found.' }) 
   @Roles(Role.Admin)
   @Get(':id')
   async getOne(@Param('id' ,ParseIntPipe ) id: number){
      return await this.parkingSpacesService.findOne(id);
   }

   @ApiOperation({summary: 'Update parking-space'})
   @ApiResponse({status: 200, description: 'The parking-space has been successfully updated '})
   @Roles(Role.Admin)
   @Patch(':id')
   async update(
      @Param('id' , ParseIntPipe) id: number, 
      @Body() updateParkinSpaceDto: UpdateParkingSpaceDto
      ) {
       return await this.parkingSpacesService.update(id,updateParkinSpaceDto);
   }

   @ApiOperation({summary: 'Delete parking-space'})
   @ApiResponse({status: 200 , description: 'The parking-space has been successfully updated'})
   @Roles(Role.Admin)
   @Delete(':id')
   async deleteOne(@Param('id',ParseIntPipe) id: number) {
     await this.parkingSpacesService.delete(+id); 
     return 'Parking space deleted successfully!';
   }

   
}
