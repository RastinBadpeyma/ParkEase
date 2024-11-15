import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "./input/create.user.dto";

@Injectable()
export class AuthService {
  constructor(
   private readonly jwtService: JwtService,
   private readonly usersService: UsersService,
  ){}

  public async register(createUserDto: CreateUserDto){
    const user = await this.usersService.findUserByEmail(createUserDto.email);

    if(user){
      throw new HttpException('User already exists' , 400);
    }
    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    createUserDto.password = await this.hashPassword(createUserDto.password);

    return await this.usersService.createUser(createUserDto);

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