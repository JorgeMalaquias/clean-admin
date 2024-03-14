import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CustomerDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsNumber()
    phone: number;
  }
  