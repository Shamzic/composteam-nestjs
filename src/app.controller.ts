import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHome();
  }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.appService.create({
      name,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return user;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.appService.findOneByEmail(email);
    if (!user) {
      // error handling with correct status code
      throw new BadGatewayException('User not found');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new BadGatewayException('Wrong password');
    }
    return {
      access_token: await this.jwtService.signAsync({ id: user.id }),
    };
  }

  @Get('user')
  async user(@Body('access_token') access_token: string) {
    try {
      const data = await this.jwtService.verifyAsync(access_token);
      const user = await this.appService.findOneById(data['id']);
      delete user.password;
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
