import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entities/users.entity';
import { IsStrongPassword } from './is-strong-password.decorator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MaxLength(50, {
    message: 'El nombre no puede tener más de 50 caracteres',
  })
  nombre!: string;

  @IsString({ message: 'El apellido paterno debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido paterno no puede estar vacío' })
  @MaxLength(50, {
    message: 'El apellido paterno no puede tener más de 50 caracteres',
  })
  paterno!: string;

  @IsString({ message: 'El apellido materno debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido materno no puede estar vacío' })
  @MaxLength(50, {
    message: 'El apellido materno no puede tener más de 50 caracteres',
  })
  materno!: string;

  @IsEmail({}, {
    message: 'El email debe ser un correo electrónico válido',
  })
  @MaxLength(100, {
    message: 'El email no puede tener más de 100 caracteres',
  })
  email!: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'El rol debe ser admin, user o guest',
  })
  rol?: UserRole;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  })
  @MaxLength(100, {
    message: 'La contraseña no puede tener más de 100 caracteres',
  })
  @IsStrongPassword()
  password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
    nombre?: string;

    @IsOptional()
    @IsString({ message: 'El apellido paterno debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El apellido paterno no puede estar vacío' })
    @MaxLength(50, { message: 'El apellido paterno no puede tener más de 50 caracteres' })
    paterno?: string;

    @IsOptional()
    @IsString({ message: 'El apellido materno debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El apellido materno no puede estar vacío' })
    @MaxLength(50, { message: 'El apellido materno no puede tener más de 50 caracteres' })
    materno?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    @MaxLength(100, { message: 'El email no puede tener más de 100 caracteres' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(100, { message: 'La contraseña no puede tener más de 100 caracteres' })
    @IsStrongPassword()
    password?: string;

    @IsOptional()
    @IsEnum(UserRole, {
      message: 'El rol debe ser admin, user o guest',
    })
    //@IsIn(['admin', 'user', 'guest'], { message: 'El rol debe ser admin, user o guest' })
    rol?: string;
}


/*import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsIn} from 'class-validator';
import { UserRole } from '../entities/users.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  paterno!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  materno!: string;

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsEnum(UserRole)
  rol?: UserRole;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}*/

/*
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  paterno?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  materno?: string;

  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsEnum(UserRole)
  rol?: UserRole; 

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password?: string;
}*/