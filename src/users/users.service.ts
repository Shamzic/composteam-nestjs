import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Simon Hamery',
      username: 'shamery',
      password: 'test',
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'jane',
      password: 'jane',
    },
  ];

  async findOne(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
}
