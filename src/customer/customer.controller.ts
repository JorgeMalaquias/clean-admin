import { Body, Controller, Get, Post } from '@nestjs/common';
import {  CustomerService } from './customer.service';
import { CustomerDTO } from './types/types';

@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return this.customerService.getHello();
  }

  @Post()
  async createCustomer(@Body() data: CustomerDTO): Promise<void> {
    await this.customerService.createCustomer(data);
  }
}
