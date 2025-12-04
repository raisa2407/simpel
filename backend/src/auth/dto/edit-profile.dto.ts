import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class EditProfileDto {
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama wajib diisi' })
  nama: string;

  @IsString({ message: 'Nomor telepon harus berupa teks' })
  @IsNotEmpty({ message: 'Nomor telepon wajib diisi' })
  noTelp: string;

  @IsString({ message: 'NIK harus berupa teks' })
  @IsNotEmpty({ message: 'NIK wajib diisi' })
  nik: string;

  @IsString({ message: 'Alamat harus berupa teks' })
  @IsNotEmpty({ message: 'Alamat wajib diisi' })
  alamat: string;

  @IsOptional()
  @IsString({ message: 'Foto KTP harus berupa teks' })
  fotoKtp?: string;
}
