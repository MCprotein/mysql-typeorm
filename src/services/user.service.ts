import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../entity';
import { UserModel, userModel, UserDbInfo } from '../models';
import { userValidation } from '../utils';
interface UserInfo extends UserDbInfo {
  passwordConfirm: string;
}

interface UpdateInfo {
  username?: string;
  email?: string;
  password: string;
}

class UserService {
  userModel: UserModel;
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findById(id);
    return await userValidation.userExist(user);
  }

  async create(userInfo: UserInfo): Promise<User> {
    const { username, email, password, passwordConfirm } = userInfo;

    await userValidation.pwdCheck(password, passwordConfirm);

    const newInfo = { username, email, password };
    return await this.userModel.create(newInfo);
  }

  async update(id: number, updateInfo: UpdateInfo): Promise<User> {
    const { password } = updateInfo;
    await userValidation.updateCheck(id, password);

    await this.userModel.update(id, updateInfo);
    const updatedUser = await this.userModel.findById(id);
    return await userValidation.userExist(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userModel.findById(id);
    await userValidation.userExist(user);
    await this.userModel.delete(id);
  }
}

export const userService = new UserService(userModel);
