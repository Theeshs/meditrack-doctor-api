import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateDoctorDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  specialization: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isAvailable: boolean;
}
