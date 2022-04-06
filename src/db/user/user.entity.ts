import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserService } from '../service/service.entity';

export interface User {
  id: number;
  email: string;
  name: string;
  user_services: Promise<UserService[]>;
}

@Entity({
  name: 'user',
  synchronize: true,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value,
    },
  })
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @Column({
    length: 20,
    nullable: true,
  })
  @Length(4, 20)
  @IsString()
  name: string;

  @Column({
    length: 256,
    nullable: false,
    transformer: {
      to: (val: string) => bcrypt.hashSync(val, 5),
      from: (val: string) => val,
    },
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => UserService, (userService) => userService.users, {
    lazy: true,
  })
  @JoinTable()
  user_services: Promise<UserService[]>;

  @AfterLoad()
  onLoad() {
    if (!this.name) this.name = this.email;
  }
}
