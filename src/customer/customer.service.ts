import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CustomerDTO } from './types/types';


@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createCustomer(data: CustomerDTO): Promise<void> {
    await this.customerRepository.createCustomer(data);
  }
}
