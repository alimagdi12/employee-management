import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'البريد الإلكتروني غير صالح | Invalid email format' })
  email: string;
}
