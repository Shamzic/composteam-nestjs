import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<User[]> {
    // const user = await this.appService.createUser('Alfred Hitchcock');
    // return await this.appService.updateUser(user.id, 'TEST 5555');
    return await this.appService.getAll();
  }
}
