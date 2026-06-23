// captcha.Service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CaptchaService {
  private readonly secretKey: string;

  constructor() {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      throw new Error('RECAPTCHA_SECRET_KEY no está configurada en variables de entorno');
    }
    this.secretKey = secretKey;
  }

  async verify(token: string): Promise<boolean> {
    if (!token) {
      throw new UnauthorizedException('Token de captcha no proporcionado');
    }

    try {
      const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: this.secretKey,
            response: token,
          },
          timeout: 5000,
        },
      );

      //console.log('reCAPTCHA verification response:', response.data);

      if (response.data.success) {
        return true;
      } else {
        const errorCodes = response.data['error-codes'] || [];
        console.error('reCAPTCHA verification failed:', errorCodes);
        return false;
      }
    } catch (error) {
      console.error('Error al verificar captcha:');
      return false;
    }
  }

  async verifyOrThrow(token: string): Promise<void> {
    const isValid = await this.verify(token);
    if (!isValid) {
      throw new UnauthorizedException('Captcha inválido o expirado');
    }
  }
}