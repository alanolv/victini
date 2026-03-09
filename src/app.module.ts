import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [UserModule, AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
