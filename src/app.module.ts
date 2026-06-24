import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { AuthModule } from './auth/auth.module';
import { CaptchaService } from './auth/captchaService';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'postgres' || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ProductImagesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace las variables de entorno globales
    }),
  ],
  controllers: [],
  providers: [ CaptchaService ],
})
export class AppModule {}
   /*type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:'admin',
      password: 'Admin.2026*',
      database: 'db_taw251_proyecto',*/