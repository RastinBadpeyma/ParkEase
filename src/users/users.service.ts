import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/input/create.user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async findAll() {
    return await this.userRepository.find();
  }

  async findUserByEmail (email: string)  {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

   async createUser (createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    this.userRepository.save(user);
    return user;
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      }
    })
  }

}
