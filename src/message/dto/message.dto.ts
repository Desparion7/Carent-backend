import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  phone: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
