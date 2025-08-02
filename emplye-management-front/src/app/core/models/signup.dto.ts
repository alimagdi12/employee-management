import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  phone!: string;

  @IsNotEmpty({ message: 'Username is required' })
  username!: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one capital letter and one symbol',
  })
  password!: string;
}
