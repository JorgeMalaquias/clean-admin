import { Module } from '@nestjs/common';
import { CustomerController} from './customer.controller';

@Module({
  imports: [CustomerController]
})
export class AppModule {}
