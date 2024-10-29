import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
   @InjectRepository(User)
   private readonly userRepository: Repository<User>
  ){
   super();
  }

  public async validate(username: string , password: string) : Promise<any> {
   const user = await this.userRepository.findOne({
      where: {username}
   })

   if (!user) {
      throw new UnauthorizedException();
   }

   if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
   }
   return user;
  }
}