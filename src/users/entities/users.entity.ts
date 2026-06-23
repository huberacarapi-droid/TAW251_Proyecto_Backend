import {  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

@Entity({name: 'users'})

export class User{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  nombre!: string;

  @Column({ length: 50 })
  paterno!: string;

  @Column({ length: 50 })
  materno!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GUEST
    })
  rol!: UserRole;

  @Column({
    nullable: false,
    select: false
  })
  password!: string;

  /*@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;*/

  @CreateDateColumn({
    select: false
  })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  /*@DeleteDateColumn()
  deletedAt!: Date;*/
}
