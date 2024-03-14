import { Body, Controller, Get, Post } from '@nestjs/common';
import { Customer } from 'src/database/types';
import {  CustomerService } from './customer.service';
import { CustomerDTO } from './types/types';

@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers():Promise<Customer[]> {
    return await this.customerService.getCustomers();
  }

  @Post()
  async createCustomer(@Body() data: CustomerDTO): Promise<void> {
    await this.customerService.createCustomer(data);
  }
}
