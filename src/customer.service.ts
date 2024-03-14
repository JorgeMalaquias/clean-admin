import { Injectable } from '@nestjs/common';
import { Customer } from './database/types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomerRepository } from './customer.repository';

export class CustomerDTO {
  @IsNotEmpty()
  @IsString()
  name:string;
  @IsNotEmpty()
  @IsString()
  email:string;
  @IsNotEmpty()
  @IsNumber()
  phone:number
}

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createCustomer(data:CustomerDTO):Promise<any>{
    const newCustomer = await this.customerRepository.createCustomer(data);
    return newCustomer;
  }
}
