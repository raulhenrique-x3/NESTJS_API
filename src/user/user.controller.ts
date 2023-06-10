import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly userService: UsersService) { }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<User> {
    return this.userService.findOne(params.id);
  }

  @Post()
  async create(@Body() UserFromBody: IUser) {
    const user = new User();
    user.nome = UserFromBody.nome;
    user.sobreNome = UserFromBody.sobreNome;
    user.cpf = UserFromBody.cpf;
    user.email = UserFromBody.email;
    user.telefone = UserFromBody.telefone;
    user.senha = UserFromBody.senha;
    return this.userService.create(user);
  }

  @Put(':id')
  async editUser(
    @Param('id') id: number,
    @Body() UserFromBody: IUser,
  ): Promise<User> {
    const findUser = await this.userService.findOne(id);

    findUser.nome = UserFromBody.nome;
    findUser.sobreNome = UserFromBody.sobreNome;
    findUser.cpf = UserFromBody.cpf;
    findUser.email = UserFromBody.email;
    findUser.telefone = UserFromBody.telefone;
    findUser.senha = UserFromBody.senha;
    return this.userService.create(findUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
