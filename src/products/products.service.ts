import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/products.entity';
import { Category } from '../categories/entities/categories.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';

import {
  CreateProductDto,
  UpdateProductDto,
} from './dto/products.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(ProductImage)
    private imageRepository: Repository<ProductImage>,
  ) {}

  async createProduct(product: CreateProductDto) {

    const category = await this.categoryRepository.findOne({
      where: {
        id: product.categoryId,
      },
    });

    if (!category) {
      return new HttpException(
        'Categoría no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    const newProduct = this.productRepository.create({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      category,
      images: product.images.map(url =>
        this.imageRepository.create({ url }),
      ),
    });

    return this.productRepository.save(newProduct);
  }

  getProducts() {
    return this.productRepository.find({
      relations: {
        images: true,
      }
    });
  }

  async getProduct(id: number) {

    const productFound =
      await this.productRepository.findOne({
        where: { id },
        relations: {
            images: true,
          }
      });

    if (!productFound) {
      return new HttpException(
        'Producto no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return productFound;
  }

  async updateProduct(
    id: number,
    product: UpdateProductDto,
  ) {

    const productFound =
      await this.productRepository.findOne({
        where: { id },
        relations: {
          images: true,
        },
      });

    if (!productFound) {
      return new HttpException(
        'Producto no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    if (product.categoryId) {

      const category =
        await this.categoryRepository.findOne({
          where: {
            id: product.categoryId,
          },
        });

      if (!category) {
        return new HttpException(
          'Categoría no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      productFound.category = category;
    }

    productFound.nombre =
      product.nombre ?? productFound.nombre;

    productFound.descripcion =
      product.descripcion ??
      productFound.descripcion;

    productFound.precio =
      product.precio ?? productFound.precio;

    productFound.stock =
      product.stock ?? productFound.stock;

    if (product.images) {

      productFound.images =
        product.images.map(url =>
          this.imageRepository.create({ url }),
        );
    }

    return this.productRepository.save(
      productFound,
    );
  }

  async deleteProduct(id: number) {

    const result =
      await this.productRepository.delete({
        id,
      });

    if (result.affected === 0) {
      return new HttpException(
        'Producto no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
  
  // products.service.ts
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        throw new HttpException(
          `Categoría con ID ${categoryId} no encontrada`,
          HttpStatus.NOT_FOUND,
        );
      }

      const products = await this.productRepository.find({
        where: {
          category: {
            id: categoryId,
          },
        },
        relations: {
          images: true,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return products;
    } catch (error) {
      //console.log(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error al obtener productos por categoría',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}