import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ParkingSpacesService } from 'src/parking-spaces/parking-spaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation , ParkingSpace , User])
  ],
  controllers: [ReservationController],
  providers: [ReservationService,ParkingSpacesService],
})
export class ReservationModule {}
