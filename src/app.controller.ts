import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './auth/local/local.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Post('oldregister')
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

  @Post('oldlogin')
  async oldlogin(
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
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  @Get('olduser')
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
