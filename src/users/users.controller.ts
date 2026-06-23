import { Controller, Get, Post, Patch,  Delete,  Body, Param , ParseIntPipe, HttpException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from './entities/users.entity';
import { DeleteResult } from 'typeorm/browser';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService){}

  @Get()
  getUsers() : Promise<User[] | HttpException> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) : Promise<User | HttpException> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) : Promise<User | HttpException> {
    return this.usersService.createUser(newUser);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) : Promise<User | HttpException> {
    return this.usersService.updateUser(id, updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) : Promise<DeleteResult | HttpException> { // ParseIntPipe convierte el id a un número entero
    return this.usersService.deleteUser(id);
  }
}
