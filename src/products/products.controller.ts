import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { ProductsService } from './products.service';

import {
  CreateProductDto,
  UpdateProductDto,
} from './dto/products.dto';

import { Product } from './entities/products.entity';

@Controller('products')
export class ProductsController {

  constructor(
    private productsService: ProductsService,
  ) {}

  @Get()
  getProducts():
  Promise<Product[] | HttpException> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product | HttpException> {

    return this.productsService.getProduct(id);
  }

  @Post()
  createProduct(
    @Body() product: CreateProductDto,
  ): Promise<Product | HttpException> {

    return this.productsService.createProduct(
      product,
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ): Promise<Product | HttpException> {

    return this.productsService.updateProduct(
      id,
      product,
    );
  }

  @Delete(':id')
  deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult | HttpException> {

    return this.productsService.deleteProduct(
      id,
    );
  }

  @Get('category/:categoryId')
  getProductsByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Product[] | HttpException> {
    console.log(categoryId)
    return this.productsService.getProductsByCategory(categoryId);
  }
}