import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
export class LocalizationDTO {
  @IsNotEmpty()
  @IsNumberString()
  x: number;
  @IsNotEmpty()
  @IsNumberString()
  y: number;
}
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
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizationDTO)
  localization: LocalizationDTO;
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
