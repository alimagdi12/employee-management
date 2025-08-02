/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private empModel: Model<EmployeeDocument>) {}

  async create(dto: CreateEmployeeDto) {
    const employee = new this.empModel(dto);
    return employee.save();
  }

  async findAll() {
    return this.empModel.find();
  }

  async findOne(id: string) {
    const employee = await this.empModel.findById(id);
    if (!employee) throw new NotFoundException('الموظف غير موجود | Employee not found');
    return employee;
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    const employee = await this.empModel.findByIdAndUpdate(id, dto, { new: true });
    if (!employee) throw new NotFoundException('الموظف غير موجود | Employee not found');
    return employee;
  }

  async delete(id: string) {
    const employee = await this.empModel.findByIdAndDelete(id);
    if (!employee) throw new NotFoundException('الموظف غير موجود | Employee not found');
    return { message: 'تم الحذف بنجاح | Deleted successfully' };
  }
}
