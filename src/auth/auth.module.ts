import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { LocalStrategy } from "./strategies/local-strategy";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[LocalStrategy]
})

export class AuthModule{}