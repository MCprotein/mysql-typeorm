import { validate } from 'class-validator';
import { Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

interface UserInfo {
  username: string;
  email: string;
  password1: string;
  password2: string;
}
class UserService {
  constructor() {}
  async create(userInfo: UserInfo): Promise<any> {
    const { username, email, password1, password2 } = userInfo;

    if (password1 !== password2) {
      const error = new Error('비밀번호가 일치하지 않습니다.');
      error.name = 'BadRequest';
      throw error;
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password1;

    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error('Validation failed!');
    } else {
      const userRepository = getRepository(User);
      const createdUser = await userRepository.save(user);
      return createdUser;
    }
  }
}

export const userService = new UserService();
