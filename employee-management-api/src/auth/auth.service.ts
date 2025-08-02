/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto/signup.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto/login.dto';
import * as sgMail from '@sendgrid/mail';
import { ForgotPasswordDto } from './dto/forget-password/forget-password.dto';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY!);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, username, password, phone } = signupDto;

    const [emailExists, usernameExists, phoneExists] = await Promise.all([
      this.usersService.findByEmail(email),
      this.usersService.findByUsername(username),
      this.usersService.findByPhone(phone),
    ]);

    if (emailExists) {
      throw new BadRequestException('البريد الإلكتروني مستخدم مسبقًا | Email is already in use');
    }

    if (usernameExists) {
      throw new BadRequestException('اسم المستخدم مستخدم مسبقًا | Username is already in use');
    }

    if (phoneExists) {
      throw new BadRequestException('رقم الهاتف مستخدم مسبقًا | Phone number is already in use');
    }

    if (password.includes(username)) {
      throw new BadRequestException('كلمة المرور لا يمكن أن تحتوي على اسم المستخدم | Password cannot contain the username');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      username,
      password: hashed,
      phone,
    });

    return {
      message: 'تم إنشاء الحساب بنجاح | Account created successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if (!user)
      throw new UnauthorizedException('البريد أو كلمة المرور غير صحيحة | Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('كلمة المرور غير صحيحة | Incorrect password');

    const token = this.jwtService.sign({ id: user._id });
    return {
      message: 'تم تسجيل الدخول بنجاح | Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
      },
    };
  }

  async forgetPassword(dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('المستخدم غير موجود | User not found');
    }

    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '10m' });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const msg = {
      to: user.email,
      from: 'alimagdi12367@gmail.com', // Must be verified in SendGrid
      subject: 'إعادة تعيين كلمة المرور | Password Reset',
      text: `انقر على الرابط لإعادة تعيين كلمة المرور: ${resetLink}`,
      html: `
        <p>مرحبًا ${user.username}،</p>
        <p>انقر على الرابط التالي لإعادة تعيين كلمة المرور:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    };

    try {
      await sgMail.send(msg);
      return { message: 'تم إرسال رابط إعادة التعيين | Reset link sent to email' };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('حدث خطأ أثناء إرسال البريد الإلكتروني | Failed to send email');
    }
  }

  async getUser(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('المستخدم غير موجود | User not found');
      }
      return {
        id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('رمز الدخول غير صالح أو منتهي الصلاحية | Invalid or expired token');
    }
  }
}