import { User } from '../../entity';
import { userModel, UserModel } from '../../models/';
class UserValidation {
  private userModel: UserModel;
  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }
  async userExist(user: User | null): Promise<User> {
    if (!user) {
      throw new Error('유저가 존재하지 않습니다.');
    }
    return user;
  }

  async pwdCheck(password: string, passwordConfirm: string): Promise<void> {
    if (password !== passwordConfirm) {
      const error = new Error('비밀번호가 일치하지 않습니다.');
      error.name = 'BadRequest';
      throw error;
    }
  }

  async updateCheck(id: number, password: string): Promise<void> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error(`${id} 유저가 존재하지 않습니다.`);
    }
    if (password !== user?.password) {
      throw new Error('비밀번호가 틀렸습니다.');
    }
  }
}

export const userValidation = new UserValidation(userModel);
