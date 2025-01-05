import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository, UpdateDescription } from 'typeorm';
import { ParkingSpacesService } from './../parking-spaces/parking-spaces.service';
import { ParkingSpace } from './../parking-spaces/entities/parking-spaces.entity';
import { User } from './../users/entities/user.entity';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
   @InjectRepository(User)
   private readonly userRepo: Repository<User>,
   @InjectRepository(ParkingSpace)
   private readonly parkingSpaceRepo: Repository<ParkingSpace>
  ){}

  async create(createReservationDto: CreateReservationDto) {
    const user = await this.userRepo.findOne({
      where: {id: createReservationDto.userId}
    });

    if(!user){
       throw new NotFoundException('User Not Found');
    }

    const parkingSpace = await this.parkingSpaceRepo.findOne({
      where: {id: createReservationDto.parkingSpaceId}
    })

    if (!parkingSpace) { 
      throw new NotFoundException('Parking space not found');
     }

    const { reservationDate, startTime, endTime } = createReservationDto;
   const overlappingReservations = await this.reservationRepo.find({
     where: {
       parkingSpace: { id: createReservationDto.parkingSpaceId },
      reservationDate,
       // Custom condition for overlapping times
       startTime: LessThanOrEqual(endTime),
       endTime: MoreThanOrEqual(startTime),
     },
   });
 
   if (overlappingReservations.length > 0) {
     throw new HttpException('The parking space is already reserved during the requested time',HttpStatus.NOT_FOUND);
   }

     const reservation = this.reservationRepo.create({
      ...createReservationDto,
      user:user,
      parkingSpace: parkingSpace
     });
     return this.reservationRepo.save(reservation);
  }



   async updateReservation(id: number , updateReservationDto:UpdateReservationDto){
    const reservation = await this.reservationRepo.findOne({where: {id}});

    if(!reservation){
      throw new NotFoundException('Reservation not found');
    }
    
    Object.assign(reservation , updateReservationDto);
    return await this.reservationRepo.save(reservation);

   }


   async removeReservation(id:number){
    const reservation = await this.reservationRepo.findOne({where: {id}});

    if(!reservation){
      throw new NotFoundException('Reservation not found');
    }

    return await this.reservationRepo.remove(reservation);
   }


   async getUsersWithReservations(){
    const reservation = await this.reservationRepo.find({ relations: ['user', 'parkingSpace'], }); 

    if (!reservation) { 
      throw new NotFoundException('Reservation not found'); 
    } 
    return reservation; 

  }

  async getReservationsInfo(){
    const reservation = await this.reservationRepo.find({ relations: ['parkingSpace'], }); 

    if (!reservation) { 
      throw new NotFoundException('Reservation not found'); 
    } 
    return reservation; 

  }

  async getReservationById(id:number){
    const reservation = await this.reservationRepo.findOne({where: {id}});

    if (!reservation) { 
      throw new NotFoundException('Reservation not found'); 
    } 
    return reservation; 
  }
  

  
}
