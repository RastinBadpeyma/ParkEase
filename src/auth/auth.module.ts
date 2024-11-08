import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { LocalStrategy } from "./strategies/local-strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt-strategy";

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
    providers:[LocalStrategy,AuthService,JwtStrategy],
    controllers: [AuthController]
})

export class AuthModule{}