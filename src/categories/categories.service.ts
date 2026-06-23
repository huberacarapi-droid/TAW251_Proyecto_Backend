import {Injectable, HttpException, HttpStatus, } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto, } from './dto/categories.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto) {

    const categoryExists =
      await this.categoryRepository.findOne({
        where: {
          nombre: category.nombre,
        },
      });

    if (categoryExists) {
      return new HttpException(
        'La categoría ya existe',
        HttpStatus.CONFLICT,
      );
    }

    const newCategory =
      this.categoryRepository.create(category);

    return this.categoryRepository.save(newCategory);
  }

  getCategories() {
    return this.categoryRepository.find();
  }

  async getCategory(id: number) {

    const categoryFound =
      await this.categoryRepository.findOne({
        where: { id },
      });

    if (!categoryFound) {
      return new HttpException(
        'Categoría no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return categoryFound;
  }

  async updateCategory(
    id: number,
    category: UpdateCategoryDto,
  ) {

    const categoryFound =
      await this.categoryRepository.findOne({
        where: { id },
      });

    if (!categoryFound) {
      return new HttpException(
        'Categoría no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedCategory =
      Object.assign(categoryFound, category);

    return this.categoryRepository.save(
      updatedCategory,
    );
  }

  async deleteCategory(id: number) {

    const result =
      await this.categoryRepository.delete({
        id,
      });

    if (result.affected === 0) {
      return new HttpException(
        'Categoría no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
