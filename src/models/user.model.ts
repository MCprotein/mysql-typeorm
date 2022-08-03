import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../entity';

export interface UserDbInfo {
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  async find(): Promise<User[]> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneBy({ id });
    return user;
  }

  async create(userInfo: UserDbInfo): Promise<User> {
    const userRepository = getRepository(User);
    const newUser = userRepository.create(userInfo);
    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new Error('모든 정보를 입력해 주세요.');
    } else {
      const createdUser = await userRepository.save(newUser);
      return createdUser;
    }
  }

  async update(
    id: number,
    updateInfo: Partial<UserDbInfo>
  ): Promise<User | null> {
    const userRepository = getRepository(User);
    await userRepository.update({ id }, updateInfo);
    const updatedUser = await userRepository.findOneBy({ id });
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    const userRepository = getRepository(User);
    const result = await userRepository.delete({ id });
    // delete return 값 -> DeleteResult {raw : [], affected : 1}
    // delete가 성공할 경우 affected의 값이 1로 온다.
    if (result.affected === 0) {
      throw new Error(`${id} 유저가 존재하지 않습니다.`);
    }
  }
}

export const userModel = new UserModel();
