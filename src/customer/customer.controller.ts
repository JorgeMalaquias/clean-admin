import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Customer } from 'src/database/types';
import {  CustomerService } from './customer.service';
import { CustomerDTO, GetCustomerByEmailDTO, GetCustomerByPhoneDTO } from './types/types';

@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers():Promise<Customer[]> {
    return await this.customerService.getCustomers();
  }
  @Get('/byEmail/:email')
  async getCustomerByEmail(@Param() params:GetCustomerByEmailDTO): Promise<Customer[]> {
    return await this.customerService.getCustomerByEmail(params.email);
  }
  @Get('/byName/:name')
  async getCustomerByName(@Param('name') name:string): Promise<Customer[]> {
    return await this.customerService.getCustomerByName(name);
  }
  @Get('/byPhone/:phone')
  async getCustomerByPhone(@Param() params:GetCustomerByPhoneDTO): Promise<Customer[]> {
    return await this.customerService.getCustomerByPhone(params.phone);
  }
  @Post()
  async createCustomer(@Body() data: CustomerDTO): Promise<void> {
    await this.customerService.createCustomer(data);
  }
}
