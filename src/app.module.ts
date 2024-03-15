import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { LocalizationModule } from './localization/localization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomerModule,
    LocalizationModule,
  ],
})
export class AppModule {}
