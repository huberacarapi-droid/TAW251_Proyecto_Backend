import { IsInt, IsNumber, IsPositive, IsString, IsArray, IsUrl, Min, } from 'class-validator';

export class CreateProductDto {

  @IsString()
  nombre!: string;

  @IsString()
  descripcion!: string;

  @IsNumber()
  precio!: number;

  @IsInt()
  @Min(0)
  stock!: number;

  @IsInt()
  categoryId!: number;

  @IsArray()
  @IsUrl({}, { each: true })
  images!: string[];
}

export class UpdateProductDto {
  @IsString()
  nombre?: string;

  @IsString()
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  precio?: number;

  @IsInt()
  @Min(0)
  stock?: number;

  @IsInt()
  categoryId?: number;

  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];
}