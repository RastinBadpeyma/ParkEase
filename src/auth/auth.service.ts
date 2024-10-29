import { JwtService } from "@nestjs/jwt";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
   private readonly jwtService: JwtService,
  ){}

  public getTokenForUser(user: User): string {
   return this.jwtService.sign({
      username: user.username,
      sub:user.id
   });
  }
}