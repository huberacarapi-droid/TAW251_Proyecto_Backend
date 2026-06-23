import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { CaptchaService } from './captchaService';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private captchaService: CaptchaService,
  ) {}

  /*async login(
    loginDto: LoginDto,
  ) {

    const user =
      await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where(
          'user.email = :email',
          {
            email: loginDto.email,
          },
        )
        .getOne();
    console.log(user);
    if (!user) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    const passwordValid =
      await bcrypt.compare(
        loginDto.password,
        user.password,
      );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol,
    };

    const token =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      access_token: token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    };
  }*/
  async login(
  loginDto: LoginDto,
) {

  const captchaValid =
    await this.captchaService.verify(
      loginDto.captchaToken,
    );

  if (!captchaValid) {
    throw new UnauthorizedException(
      'Captcha inválido',
    );
  }

  const user =
    await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where(
        'user.email = :email',
        {
          email: loginDto.email,
        },
      )
      .getOne();

  if (!user) {
    throw new UnauthorizedException(
      'Credenciales incorrectas',
    );
  }

  const passwordValid =
    await bcrypt.compare(
      loginDto.password,
      user.password,
    );

  if (!passwordValid) {
    throw new UnauthorizedException(
      'Credenciales incorrectas',
    );
  }

  const payload = {
    sub: user.id,
    email: user.email,
    rol: user.rol,
  };

  const token =
    await this.jwtService.signAsync(
      payload,
    );

  return {
    access_token: token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  };
}
}