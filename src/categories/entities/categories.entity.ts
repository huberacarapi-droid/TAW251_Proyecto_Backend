import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn,} from 'typeorm';
import { Product } from '../../products/entities/products.entity';

@Entity({name: 'categories'})

export class Category {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
    unique: true,
  })
  nombre!: string;

  @Column({
    nullable: true,
    length: 255,
  })
  descripcion?: string;

  @CreateDateColumn({
    select: false
  })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => Product,
    product => product.category,
  )
  products!: Product[];
}