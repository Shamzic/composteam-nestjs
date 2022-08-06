import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Post {

    @PrimaryGeneratedColumn() // autoincrement integer
    id: number;

    @Column() // varchar(255)
    title: string;
}
