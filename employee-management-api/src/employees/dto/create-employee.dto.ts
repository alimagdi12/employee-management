/* eslint-disable prettier/prettier */
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'الاسم مطلوب | Name is required' })
  @IsString({ message: 'الاسم يجب أن يكون نصًا | Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'الكود مطلوب | Code is required' })
  @IsString({ message: 'الكود يجب أن يكون نصًا | Code must be a string' })
  code: string;

  @IsNotEmpty({ message: 'الحالة الاجتماعية مطلوبة | Marital status is required' })
  @IsString({ message: 'الحالة الاجتماعية يجب أن تكون نصًا | Marital status must be a string' })
  maritalStatus: string;

  @IsNotEmpty({ message: 'تاريخ الميلاد مطلوب | Birthdate is required' })
  @IsDateString({}, { message: 'تاريخ الميلاد غير صالح | Invalid birthdate format' })
  birthdate: Date;

  @IsOptional()
  @IsString({ message: 'رقم الهاتف يجب أن يكون نصًا | Phone must be a string' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'الدين يجب أن يكون نصًا | Religion must be a string' })
  religion?: string;

  @IsOptional()
  @IsString({ message: 'العنوان يجب أن يكون نصًا | Address must be a string' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'الوظيفة يجب أن تكون نصًا | Job must be a string' })
  job?: string;

  @IsNotEmpty({ message: 'تاريخ التعيين مطلوب | Appointment date is required' })
  @IsDateString({}, { message: 'تاريخ التعيين غير صالح | Invalid appointment date' })
  appointmentDate: Date;


  @IsNotEmpty({ message: 'تاريخ استلام العمل مطلوب | Work receipt date is required' })
  @IsDateString({}, { message: 'تاريخ استلام العمل غير صالح | Invalid work receipt date' })
  workReceiptDate: Date;

  @IsOptional()
  @IsDateString({}, { message: 'تاريخ دخول المدرسة غير صالح | Invalid school entry date' })
  schoolEntryDate?: Date;

  @IsOptional()
  @IsString({ message: 'الدرجة الحالية يجب أن تكون نصًا | Current degree must be a string' })
  currentDegree?: string;

  @IsOptional()
  @IsDateString({}, { message: 'تاريخ الحصول على الدرجة غير صالح | Invalid degree date' })
  currentDegreeDate?: Date;
  
  @IsOptional()
  @IsString({ message: 'جهة النقل يجب أن تكون نصًا | Transfer place must be a string' })
  transferPlace?: string;

  @IsOptional()
  @IsString({ message: 'رقم التأمين يجب أن يكون نصًا | Insurance number must be a string' })
  insuranceNumber?: string;
}
