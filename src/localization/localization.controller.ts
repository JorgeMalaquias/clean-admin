import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Customer } from 'src/database/types';
import {
  CustomerDTO,
  GetCustomerByEmailDTO,
  GetCustomerByPhoneDTO,
} from '../customer/types/types';
import { LocalizationService } from './localization.service';

@Controller('/localizations')
export class LocalizationController {
  constructor(private readonly customerService: LocalizationService) {}

  @Get()
  async getCustomers(): Promise<Customer[]> {
    return await this.customerService.getCustomers();
  }
  @Get('/byEmail/:email')
  async getCustomerByEmail(
    @Param() params: GetCustomerByEmailDTO,
  ): Promise<Customer[]> {
    return await this.customerService.getCustomerByEmail(params.email);
  }
  @Get('/byName/:name')
  async getCustomerByName(@Param('name') name: string): Promise<Customer[]> {
    return await this.customerService.getCustomerByName(name);
  }
  @Get('/byPhone/:phone')
  async getCustomerByPhone(
    @Param() params: GetCustomerByPhoneDTO,
  ): Promise<Customer[]> {
    return await this.customerService.getCustomerByPhone(params.phone);
  }
  @Post()
  async createCustomer(@Body() data: CustomerDTO): Promise<void> {
    await this.customerService.createCustomer(data);
  }
}
