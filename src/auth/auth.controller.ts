import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./input/create.user.dto";
import { AuthGuardLocal } from "./guards/auth-guard.local";
import { AuthGuardJwt } from "./guards/auth-guard.jwt";


@Controller('auth')
export class AuthController {
   constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
      const user = new User();

      if (createUserDto.password !== createUserDto.retypedPassword) {
         throw new BadRequestException(['Passwords are not identical']);
      }
      
      const existingUser = await this.userRepository.findOne({
         where: [
            {username: createUserDto.username},
            {email: createUserDto.email}
         ]
      });

      if (existingUser) {
         throw new BadRequestException(['username or email is already taken'])
      }

      user.username = createUserDto.username;
      user.password = await this.authService.hashPassword(createUserDto.password);
      user.email = createUserDto.email;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;

      return {
         ...(await this.userRepository.save(user)),
         token: this.authService.getTokenForUser(user)
      }
     }
   
   @Get('profile')
   @UseGuards(AuthGuardJwt)
   async getProfile(@CurrentUser() user:User){
    return user;
   }
}