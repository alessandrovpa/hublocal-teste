import { JwtAuthGuard } from '@modules/auth/strategies/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { CreateUserService } from './services/createUser/create-user.service';
import { ListUsersService } from './services/listUsers/list-users.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private listUsersService: ListUsersService,
  ) {}

  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso!',
    type: User,
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @ApiBadRequestResponse({
    description: 'Campo com formato inválido ou não fornecido',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.createUserService.execute(createUserDto);
    const user = UserMapper.toHTTP(newUser);
    return { user };
  }

  @ApiOkResponse({
    description: 'Lista de usuários cadastrados!',
  })
  @ApiUnauthorizedResponse({
    description: 'Forneça o bearer token JWT!',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    const allUsers = await this.listUsersService.execute();
    const users = allUsers.map((user) => UserMapper.toHTTP(user));
    return { users };
  }
}
