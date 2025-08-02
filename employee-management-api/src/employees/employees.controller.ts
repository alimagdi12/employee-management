/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly empService: EmployeesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() dto: CreateEmployeeDto) {
    return this.empService.create(dto);
  }

  @Get()
  findAll() {
    return this.empService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.empService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empService.delete(id);
  }
}
