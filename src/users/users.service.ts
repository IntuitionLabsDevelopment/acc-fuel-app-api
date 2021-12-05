import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): User {
    return {
      userID: 1,
      userName: 'test',
      email: 'email',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number): User {
    return {
      userID: 1,
      userName: 'test',
      email: 'email',
    };
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    return new User();
  }

  remove(id: number): User {
    return new User();
  }
}
