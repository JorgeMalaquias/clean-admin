import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  @Get('/byEmail/:email')
  async getCustomerByEmail(@Param('email') email:string): Promise<Customer> {
    return await this.customerService.getCustomerByEmail(email);
  }
  @Post()
  async createCustomer(@Body() data: CustomerDTO): Promise<void> {
    await this.customerService.createCustomer(data);
  }
}
