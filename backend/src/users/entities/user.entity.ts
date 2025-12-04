import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  noTelp: string;

  @Column({ nullable: true })
  nik: string;

  @Column({ nullable: true })
  alamat: string;

  @Column({ nullable: true })
  fotoKtp: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}