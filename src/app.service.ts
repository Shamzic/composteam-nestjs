import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['pets'],
    }); // SELECT * FROM users
  }

  async getOneById(id: any): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id }); // SELECT * FROM users WHERE id = :id
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.userRepository.create({ name }); // Create new user
    return this.userRepository.save(newUser); // INSERT INTO users (title) VALUES (:title)
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);
    console.log('user', user);
    user.name = name;
    return this.userRepository.save(user); // UPDATE users SET title = :title WHERE id = :id
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.getOneById(id);
    return this.userRepository.remove(user); // DELETE FROM users WHERE id = :id
  }

  getHello(): string {
    return 'Hello World!';
  }
}
