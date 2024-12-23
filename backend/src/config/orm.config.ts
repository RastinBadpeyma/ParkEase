import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Profile } from "src/auth/entities/profile.entity";
import { User } from "src/users/entities/user.entity";
import { ParkingSpace } from "src/parking-spaces/entities/parking-spaces.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";





export default registerAs(
   'orm.config',
   (): TypeOrmModuleOptions => ({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities:[User,Profile,ParkingSpace,Reservation],
      synchronize: true
   })
);