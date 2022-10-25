import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Applications } from './Applications.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @OneToMany((type) => Applications, (application) => application.user)
  applications: Applications[];
}
