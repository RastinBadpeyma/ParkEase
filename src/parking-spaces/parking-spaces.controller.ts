import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ParkingSpacesService } from './parking-spaces.service';
import { CreateParkingSpaceDto } from './dto/create.parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update.parking-space.dto';

@Controller('parking-space')
export class ParkingSpacesController {
   constructor(
    private readonly parkingSpacesService: ParkingSpacesService
   ){}

   @Post()
   async createParking(@Body() createParkingSpaceDto: CreateParkingSpaceDto){
      return await this.parkingSpacesService.createParkingSpace(createParkingSpaceDto);
   }

   @Get()
   async getAllSpace(){
      return await this.parkingSpacesService.findAll()
   }

   @Get(':id')
   async getOne(@Param('id' ,ParseIntPipe ) id: number){
      return await this.parkingSpacesService.findOne(id);
   }

   @Patch(':id')
   async update(
      @Param('id' , ParseIntPipe) id: number, 
      @Body() updateParkinSpaceDto: UpdateParkingSpaceDto
      ) {
       return await this.parkingSpacesService.update(id,updateParkinSpaceDto);
   }

   @Delete(':id')
   async deleteOne(@Param('id',ParseIntPipe) id: number) {
     await this.parkingSpacesService.delete(+id); 
     return 'Parking space deleted successfully!';
   }

   
}
