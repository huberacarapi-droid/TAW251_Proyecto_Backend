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

import { CategoriesService } from './categories.service';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/categories.dto';

import { Category } from './entities/categories.entity';

@Controller('categories')
export class CategoriesController {

  constructor(
    private categoriesService: CategoriesService,
  ) {}

  @Get()
  getCategories(): Promise<Category[] | HttpException> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category | HttpException> {
    return this.categoriesService.getCategory(id);
  }

  @Post()
  createCategory(
    @Body() newCategory: CreateCategoryDto,
  ): Promise<Category | HttpException> {
    return this.categoriesService.createCategory(
      newCategory,
    );
  }

  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedCategory: UpdateCategoryDto,
  ): Promise<Category | HttpException> {
    return this.categoriesService.updateCategory(
      id,
      updatedCategory,
    );
  }

  @Delete(':id')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult | HttpException> {
    return this.categoriesService.deleteCategory(id);
  }
}