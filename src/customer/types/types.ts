import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
export class LocalizationDTO {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  x: number;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
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
  @IsNumber()
  @Type(() => Number)
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
