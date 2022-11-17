import { ApiHideProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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
  @Column()
  name: string;

  @IsString()
  @Column()
  phoneNumber: string;

  @IsString()
  @Column()
  email: string;

  @ApiHideProperty()
  @OneToMany((type) => Applications, (application) => application.user)
  applications: Applications[];

  @RelationId((users: Users) => users.applications)
  applicationIds: number[];
}
