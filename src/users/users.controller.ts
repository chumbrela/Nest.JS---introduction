import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id') id: string): User | undefined {
    // Todo: auto parse ID

    const user = this.usersService.findById(Number(id));

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
  @ApiCreatedResponse({ type: User, description: 'The user' })
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
