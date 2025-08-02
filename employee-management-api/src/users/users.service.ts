/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async findByPhone(phone: string) {
    return this.userModel.findOne({ phone });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async create(user: Partial<User>) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}