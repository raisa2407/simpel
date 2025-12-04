import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  noTelp: string;

  @IsOptional()
  @IsString()
  nik?: string | null;

  @IsOptional()
  @IsString()
  alamat?: string | null;

  @IsString()
  fotoKtp?: string;
}
