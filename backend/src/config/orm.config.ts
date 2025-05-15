import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from './../auth/entities/profile.entity';
import { User } from './../users/entities/user.entity';
import { ParkingSpace } from './../parking-spaces/entities/parking-spaces.entity';
import { Reservation } from './../reservation/entities/reservation.entity';

export class OrmConfig {
  private static instance: OrmConfig;
  private TypeOrmConfig: TypeOrmModuleOptions;

  private constructor() {
    this.TypeOrmConfig = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Profile, ParkingSpace, Reservation],
      synchronize: true,
    };
  }

  public static getInstance(): OrmConfig {
    if (!this.instance) {
      this.instance = new OrmConfig();
    }
    return this.instance;
  }

  getConfig(): TypeOrmModuleOptions {
    return this.TypeOrmConfig;
  }
}

export default () => OrmConfig.getInstance().getConfig();
