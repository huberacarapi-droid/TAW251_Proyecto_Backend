import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';
import { ProductImage } from '../../product-images/entities/product-image.entity';

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  nombre!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  precio!: number;

  @Column({
    default: 0,
  })
  stock!: number;

  @CreateDateColumn({
    select: false
  })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(
    () => Category,
    category => category.products,
    {
      eager: true,
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'category_id',
  })
  category!: Category;

  @OneToMany(
    () => ProductImage,
    image => image.product,
    {
      cascade: true,
    },
  )
  images!: ProductImage[];
}