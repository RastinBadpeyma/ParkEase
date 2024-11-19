import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfigProd from './config/orm.config.prod';
import { AuthModule } from './auth/auth.module';
import { ParkingSpacesModule } from './parking-spaces/parking-spaces.module';
import { UsersModule } from './users/users.module';
import { ReservationModule } from './reservation/reservation.module';
import { CustomersModule } from './customers/customers.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[ormConfig],
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory:process.env.NODE_ENV !== 'production'
      ? ormConfig : ormConfigProd
    }),
    AuthModule,
    ParkingSpacesModule,
    UsersModule,
    ReservationModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
