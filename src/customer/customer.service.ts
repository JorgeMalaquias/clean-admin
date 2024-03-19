import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from 'src/database/types';
import { LocalizationService } from 'src/localization/localization.service';
import { CustomerRepository } from './customer.repository';
import { CustomerDTO } from './types/types';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly localizationService: LocalizationService,
  ) {}

  async createCustomer(data: CustomerDTO): Promise<void> {
    const userPreviouslyRegistered =
      await this.customerRepository.getCustomersByEmail(data.email);
    if (userPreviouslyRegistered[0]) {
      throw new HttpException(
        'A user with the given email is already registered',
        HttpStatus.CONFLICT,
      );
    }
    const newCustomerId: number = await (
      await this.customerRepository.createCustomer(data)
    ).rows[0];
    await this.localizationService.createLocalization(
      data.localization,
      newCustomerId,
    );
  }
  async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.getCustomers();
  }
  async getCustomerByEmail(email: string): Promise<Customer[]> {
    const customers = await this.customerRepository.getCustomersByEmail(email);
    if (customers.length === 0) {
      throw new HttpException(
        'A user with the given email was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return customers;
  }
  async getCustomerByName(name: string): Promise<Customer[]> {
    const customers = await this.customerRepository.getCustomersByName(name);
    if (customers.length === 0) {
      throw new HttpException(
        'A user with the given name was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return customers;
  }
  async getCustomerByPhone(phone: number): Promise<Customer[]> {
    const customers = await this.customerRepository.getCustomersByPhone(phone);
    if (customers.length === 0) {
      throw new HttpException(
        'A user with the given phone was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return customers;
  }
}
