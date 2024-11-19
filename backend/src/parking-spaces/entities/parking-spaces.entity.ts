import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


//  ParkingLocation    GreenWichSt = "GreenWichSt",
//    FloeySquare = "FloeySquare",
//    SpeedyPark = "SpeedyPark",
//    BaxterSt = "BaxterSt",
//    PacMutual = "PacMutual",
//    HillSt = "HillSt",
//    WilshireBlvd = "WilshireBlvd"
   


@Entity()
export class ParkingSpace {

   @PrimaryGeneratedColumn()
   id: number;

   @Column({nullable:false })
   location: string ;

   @Column({default: false})
   pricePerHour: string;

   @OneToMany(() => Reservation, reservation => reservation.parkingSpace) 
   reservations: Reservation[];

}