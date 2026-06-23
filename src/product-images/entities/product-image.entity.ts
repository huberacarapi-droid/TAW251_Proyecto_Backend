import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, } from 'typeorm';

import { Product } from '../../products/entities/products.entity';
@Entity('product_images')
export class ProductImage {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 500,
  })
  url!: string;

  @ManyToOne(
    () => Product,
    product => product.images,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'product_id',
  })
  product!: Product;
}