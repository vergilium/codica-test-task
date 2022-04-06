import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export interface UserService {
  id: number;
  title: string;
  description: string;
}

@Entity({
  name: 'service',
  synchronize: true,
})
export class UserService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  @IsString()
  title: string;

  @Column({
    length: 2048,
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.user_services)
  users: User[];
}
