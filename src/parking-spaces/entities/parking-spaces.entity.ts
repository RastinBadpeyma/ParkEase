import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

   @Column()
   isOccupied: boolean;

   @Column({default: false})
   pricePerHour: string;

}