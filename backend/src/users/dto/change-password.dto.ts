import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  passwordLama: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  passwordBaru: string;
}
