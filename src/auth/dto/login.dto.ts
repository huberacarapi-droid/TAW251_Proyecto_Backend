import { IsEmail, IsString, IsNotEmpty} from 'class-validator';

export class LoginDto {

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsNotEmpty()
  captchaToken!: string; // Token de reCAPTCHA v2
}
