import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CustomerDTO } from './types/types';


@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createCustomer(data: CustomerDTO): Promise<void> {
    const userPreviouslyRegistered = await this.customerRepository.getCustomerByEmail(data.email);
    if(userPreviouslyRegistered){
      throw new HttpException('A user with the given email is already registered',HttpStatus.CONFLICT);
    }
    await this.customerRepository.createCustomer(data);
  }
}
