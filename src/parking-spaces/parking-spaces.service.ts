import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ParkingSpace } from './entities/parking-spaces.entity';
import { Repository } from 'typeorm';
import { CreateParkingSpaceDto } from './dto/create.parking-space.dto';
import { UpdateParkingSpaceDto } from './dto/update.parking-space.dto';


@Injectable()
export class ParkingSpacesService {
  constructor(
   @InjectRepository(ParkingSpace)
   private readonly parkingspaceRepo: Repository<ParkingSpace>
  ){}

  async createParkingSpace(createParkingSpaceDto: CreateParkingSpaceDto){
   const existingParking = await this.parkingspaceRepo.findOne({
    where: {
      location: createParkingSpaceDto.location,
       }
   })

   if (existingParking) {
     throw new BadRequestException('Parking space at this location is already occupied')
   }
   
    const parkingSpace =  new ParkingSpace();
     parkingSpace.location = createParkingSpaceDto.location;
     parkingSpace.isOccupied = createParkingSpaceDto.isOccupied;
     parkingSpace.pricePerHour = parkingSpace.pricePerHour;

     return await this.parkingspaceRepo.save(parkingSpace);
  }

  async findAll(){
    return await this.parkingspaceRepo.find()
 }

 async findOne(id: number): Promise<ParkingSpace> {
  return await this.parkingspaceRepo.findOne({
      where: { id: id },
  });

 }

 async update(id:number , updateParkingSpaceDto: UpdateParkingSpaceDto ) {
   const parkingSpace = await this.parkingspaceRepo.findOne({where: {id}});
   return await this.parkingspaceRepo.save({
    ...parkingSpace,
    ...updateParkingSpaceDto
   });
 }

   async delete(id:number){
    const parkingSpace = await this.parkingspaceRepo.findOne({where: {id}});
    return await this.parkingspaceRepo.remove(parkingSpace);
   }
 

}
