import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Applications } from './Applications.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiHideProperty()
  @OneToMany((type) => Applications, (application) => application.user)
  applications: Applications[];

  @RelationId((users: Users) => users.applications)
  applicationIds: number[];
}
