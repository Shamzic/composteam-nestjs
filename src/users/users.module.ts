import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Import and include UserEntityRepository here
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
