import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getHome(): string {
    return 'Backend composteam';
  }

  async create(data: any): Promise<UserEntity> {
    return this.userRepository.save(data);
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }
}
