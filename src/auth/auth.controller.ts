import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "./current-user.decorator";
import { User } from "./entities/user.entity";


@Controller('auth')
export class AuthController {
   constructor(
    private readonly authService: AuthService
   ){}

   @Post('login')
   @UseGuards(AuthGuard('local'))
   async login(@CurrentUser() user:User){
      console.log(process.env.AUTH_SECRET);

      return {
         userId: user.id,
         token: this.authService.getTokenForUser(user)
      }

   }

   @Get('profile')
   @UseGuards(AuthGuard('jwt'))
   async getProfile(@CurrentUser() user:User){
    return user;
   }
}