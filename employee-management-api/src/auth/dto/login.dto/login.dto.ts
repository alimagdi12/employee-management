import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب | Email is required' })
  email: string;

  @IsNotEmpty({ message: 'كلمة المرور مطلوبة | Password is required' })
  password: string;
}
