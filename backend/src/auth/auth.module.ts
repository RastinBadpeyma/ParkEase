import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { LocalStrategy } from "./strategies/local-strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { UsersService } from "./../users/users.service";
@Module({
 imports:[
    TypeOrmModule.forFeature([User]),
     JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: '60m'
            }
        })
     })
    ],
    providers:[LocalStrategy,AuthService,JwtStrategy,UsersService],
    controllers: [AuthController]
})

export class AuthModule{}