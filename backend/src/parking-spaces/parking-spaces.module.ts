import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpacesController } from './parking-spaces.controller';
import { ParkingSpacesService } from './parking-spaces.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ParkingSpace } from './entities/parking-spaces.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ParkingSpace])
    ],
    controllers: [
        ParkingSpacesController, ],
    providers: [
        ParkingSpacesService, ],
})
export class ParkingSpacesModule {}
