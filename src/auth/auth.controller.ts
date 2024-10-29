import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";


@Controller('auth')
export class AuthController {
   constructor(
    private readonly authService: AuthService
   ){}

   @Post('login')
   @UseGuards(AuthGuard('local'))
   async login(@Request() request){
      console.log(process.env.AUTH_SECRET);

      return {
         userId: request.user.id,
         token: this.authService.getTokenForUser(request.user)
      }

   }

   @Get('profile')
   @UseGuards(AuthGuard('jwt'))
   async getProfile(@Request() request){
    return request.user
   }
}