import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { BadRequest } from 'src/errors/badRequest';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      return new BadRequest('Senhas divergentes');
    }
    if (!createUserDto.email) {
      return new BadRequest('Email é um campo obrigatorio');
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  login(email: string, password: string) {
    return this.userModel.findOne({ email, password });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      { $set: updateUserDto },
      { new: true },
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
