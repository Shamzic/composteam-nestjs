import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/entities/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('users')
  async getAllusers(): Promise<User[]> {
    // const user = await this.appService.createUser('Alfred Hitchcock');
    // return await this.appService.updateUser(user.id, 'TEST 5555');
    return await this.appService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
