import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerDTO, CustomerService } from './customer.service';

@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @Post()
  async createCustomer(@Body() data: CustomerDTO): Promise<any> {
    return await this.customerService.createCustomer(data);
  }
}
