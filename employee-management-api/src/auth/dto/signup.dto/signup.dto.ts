import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'البريد الإلكتروني غير صالح | Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'رقم الهاتف مطلوب | Phone number is required' })
  phone: string;

  @IsNotEmpty({ message: 'اسم المستخدم مطلوب | Username is required' })
  username: string;

  @MinLength(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل | Password must be at least 8 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'كلمة المرور يجب أن تحتوي على حرف كبير ورمز | Password must contain at least one capital letter and one symbol',
  })
  password: string;
}
