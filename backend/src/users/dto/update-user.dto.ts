import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  noTelp: string;

  @IsNotEmpty()
  @IsString()
  nik: string;

  @IsNotEmpty()
  @IsString()
  alamat: string;

  @IsString()
  fotoKtp?: string;
}
