import {Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserSubscribeDto} from "./dto/user-subscribe.dto";
import {User} from "./entities/user.entity";
// import {LoginCredentialDto} from "../../dist/user/dto/login-credential.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async register(
  //     @Body() userData : UserSubscribeDto
  // ):Promise<Partial<User>>{
  //   return this.userService.register(userData);
  // }

  // @Post('login')
  // async login(
  //     @Body() credentials : LoginCredentialDto
  // ):Promise<Partial<User>>{
  //   return this.userService.login(credentials);
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get("current")
  findCurrent(@Request() req : Request){
    return req["user"]
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
