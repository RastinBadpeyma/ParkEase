import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { ReservationService } from './../reservation/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Reservation } from './../reservation/entities/reservation.entity';
import { ParkingSpace } from './../parking-spaces/entities/parking-spaces.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Reservation,ParkingSpace])
],
  controllers: [CustomersController],
  providers: [ReservationService],
})
export class CustomersModule {}
