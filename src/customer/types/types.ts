import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CustomerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNumberString()
  phone: number;
  localization: LocalizationDTO;
}
export class LocalizationDTO {
  @IsNotEmpty()
  @IsNumberString()
  x: number;
  @IsNotEmpty()
  @IsNumberString()
  y: number;
}
export class GetCustomerByEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class GetCustomerByPhoneDTO {
  @IsNotEmpty()
  @IsNumberString()
  phone: number;
}
