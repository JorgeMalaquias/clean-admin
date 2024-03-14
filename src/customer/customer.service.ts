import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from 'src/database/types';
import { CustomerRepository } from './customer.repository';
import { CustomerDTO } from './types/types';


@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createCustomer(data: CustomerDTO): Promise<void> {
    const userPreviouslyRegistered = await this.customerRepository.getCustomersByEmail(data.email);
    if(userPreviouslyRegistered[0]){
      throw new HttpException('A user with the given email is already registered',HttpStatus.CONFLICT);
    }
    await this.customerRepository.createCustomer(data);
  }
  async getCustomers():Promise<Customer[]>{
    return await this.customerRepository.getCustomers();
  }
  async getCustomerByEmail(email:string): Promise<Customer[]>{
    const customers = await this.customerRepository.getCustomersByEmail(email);
    if(customers.length===0){
      throw new HttpException('A user with the given email was not found',HttpStatus.NOT_FOUND);
    }
    return customers;
  }
}
