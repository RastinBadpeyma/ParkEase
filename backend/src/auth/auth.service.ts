import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "./../users/users.service";
import {RegisterDto } from "./input/register.dto";

@Injectable()
export class AuthService {
  constructor(
   private readonly jwtService: JwtService,
   private readonly usersService: UsersService,
  ){}

  public async register(registerDto: RegisterDto){
    const user = await this.usersService.findUserByEmail(registerDto.email);

    if(user){
      throw new HttpException('User already exists' , 400);
    }
    if (registerDto.password !== registerDto.retypedPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    registerDto.password = await this.hashPassword(registerDto.password);

    return await this.usersService.registerUser(registerDto);

  }

  public getTokenForUser(user: User): string {
   return this.jwtService.sign({
      username: user.username,
      sub:user.id
   });
  }

  public async hashPassword(password: string): Promise<string> {
     return await bcrypt.hash(password,10);
  }
}