import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';




@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): User[] {
       return this.usersService.findAll(); 
    }

    @Get(':id')
    getUserById(@Param('id') id: String): User | undefined { // Todo: auto parse ID
        return this.usersService.findById(Number(id));

    }

    @Post()
    createUser(@Body() body: CreateUserDto): User {
        return this.usersService.createUser(body);
    }
  
}
