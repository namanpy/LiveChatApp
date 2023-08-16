import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser( @Body() user : UserDTO ) {

    await this.userService.createUser(user.username, user.password);

    return { message : "success" }
  }

  @Post('login')
  async loginUser( @Body() user : UserDTO ) {

    let jwt = require('jsonwebtoken');

    await this.userService.find(user.username, user.password);

    let token = jwt.sign( { username : user.username} ,process.env.JWT_SECRET, {expiresIn : '12h' }  );

    return { message : "success", token  }
  }

  @Post('testauth')
  @UseGuards(AuthGuard)
  async testAuth(@Req() request : any) {
    return { message : 'Auth success.', token : request.token }
  }
}
