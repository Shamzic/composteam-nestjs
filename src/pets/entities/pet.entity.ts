import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn() // autoincrement integer
  id: number;

  @Column() // varchar(255)
  name: string;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;
}
