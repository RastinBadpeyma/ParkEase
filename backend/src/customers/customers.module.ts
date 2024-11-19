import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { ReservationService } from 'src/reservation/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { ParkingSpace } from 'src/parking-spaces/entities/parking-spaces.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Reservation,ParkingSpace])
],
  controllers: [CustomersController],
  providers: [ReservationService],
})
export class CustomersModule {}
