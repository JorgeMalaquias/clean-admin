import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString,  } from "class-validator";

export class CustomerDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsNumber()
    phone: number;
}
export class GetCustomerByEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email:string
}
export class GetCustomerByPhoneDTO {
  @IsNotEmpty()
  @IsNumberString()
  phone:number
}
  