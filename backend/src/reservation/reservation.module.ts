import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ParkingSpacesService } from './../parking-spaces/parking-spaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ParkingSpace } from './../parking-spaces/entities/parking-spaces.entity';
import { User } from './../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation , ParkingSpace , User])
  ],
  controllers: [ReservationController],
  providers: [ReservationService,ParkingSpacesService],
})
export class ReservationModule {}
