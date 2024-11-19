import { Injectable } from "@nestjs/common";
import { ParkingSpace } from "src/parking-spaces/entities/parking-spaces.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   reservationDate: Date;

   @Column()
   startTime: string; 

   @Column()
   endTime: string;

   @ManyToOne(() => User, user => user.reservations)
   user: User

   @ManyToOne(() => ParkingSpace , parkingSpace => parkingSpace.reservations)
   parkingSpace: ParkingSpace;
}