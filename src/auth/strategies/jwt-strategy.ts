import { Injectable,UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
   constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>
   ){
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         // it means that expired tokens will be rejected
         ignoreExpiration: false,
         secretOrKey: process.env.AUTH_SECRET      
      })
   }

   async validate(payload: any) {
      try {
         return await this.userRepository.findOneByOrFail({ id: payload.sub });
      } catch {
         throw new UnauthorizedException('User not found or invalid token.');
      }
   }   
}