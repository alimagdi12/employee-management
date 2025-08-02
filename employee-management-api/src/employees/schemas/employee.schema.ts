/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  maritalStatus: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop()
  phone: string;

  @Prop()
  religion: string;

  @Prop()
  address: string;

  @Prop()
  job: string;

  @Prop({ required: true })
  appointmentDate: Date;

  @Prop({ required: true })
  workReceiptDate: Date;

  @Prop()
  schoolEntryDate: Date;

  @Prop()
  currentDegree: string;

  @Prop()
  currentDegreeDate: Date;

  @Prop()
  transferPlace: string;

  @Prop()
  insuranceNumber: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
