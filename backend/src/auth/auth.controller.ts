import {  Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "./input/create.user.dto";
import { AuthGuardLocal } from "./guards/auth-guard.local";
import { AuthGuardJwt } from "./guards/auth-guard.jwt";


@Controller('auth')
export class AuthController {
   constructor(
    private readonly authService: AuthService,
   ){}

   @Post('login')
   @UseGuards(AuthGuardLocal)
   async login(@CurrentUser() user:User){
      console.log(process.env.AUTH_SECRET);

      return {
         userId: user.id,
         token: this.authService.getTokenForUser(user)
      }

   }

     @Post('register')
     async register(@Body() createUserDto: CreateUserDto){
       const user =  await this.authService.register(createUserDto);
       return {token: this.authService.getTokenForUser(user)};
     }
   
   @Get('profile')
   @UseGuards(AuthGuardJwt)
   async getProfile(@CurrentUser() user:User){
    return user;
   }
}