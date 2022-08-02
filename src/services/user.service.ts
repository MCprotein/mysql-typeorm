import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

interface UserInfo {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

class UserService {
  // repository: Repository<User>;
  constructor() {}

  async getUsers(): Promise<User[]> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return users;
  }

  async getUserById(userId: number): Promise<User | null> {
    const userRepository = getRepository(User);
    const user = userRepository.findOneBy({ id: userId });
    return user;
  }

  async create(userInfo: UserInfo): Promise<User> {
    const { username, email, password1, password2 } = userInfo;

    if (password1 !== password2) {
      const error = new Error('비밀번호가 일치하지 않습니다.');
      error.name = 'BadRequest';
      throw error;
    }
    const userRepository = getRepository(User);
    const newUserInfo = { username, email, password: password1 };
    const newUser = userRepository.create(newUserInfo);
    const errors = await validate(newUser);
    if (errors.length > 0) {
      console.log(errors);
      throw new Error('Validation failed!');
    } else {
      const createdUser = await userRepository.save(newUser);
      return createdUser;
    }
  }

  async update(
    userId: number,
    updateInfo: Partial<UserInfo>
  ): Promise<User | null> {
    const userRepository = getRepository(User);
    await userRepository.update({ id: userId }, updateInfo);
    const updatedUser = await userRepository.findOneBy({ id: userId });
    return updatedUser;
  }

  async delete(userId: number): Promise<void> {
    const userRepository = getRepository(User);
    const deletedUSer = await userRepository.delete({ id: userId });
    // delete return 값 -> DeleteResult {raw : [], affected : 1}
    // delete가 성공할 경우 affected의 값이 1로 옮
    if (deletedUSer.affected === 0) {
      throw new Error(`${userId} 유저가 없다.`);
    }
  }
}

export const userService = new UserService();
