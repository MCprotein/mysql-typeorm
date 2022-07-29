// import { Request } from 'express';
// import { getRepository } from 'typeorm';
// import { User } from '../entity/User';

// class UserService {
//   userModel: UserModel;
//   constructor(userModel: UserModel) {
// this.userModel = userModel;
//   }
//   async create(body: Request['body']): Promise<any> {
//     const { username, email, password1, password2 } = body;
//     const user = new User();
//     user.username = username;
//     user.email = email;
//     if (password1 !== password2) {
//       const error = new Error('비밀번호가 일치하지 않습니다.');
//       error.name = 'BadRequest';
//       throw error;
//     }
//     user.password = password1;
//     const userRepository = getRepository(User);
//     await userRepository.save(user);
//     const createdUser = await userRepository.find();
//     return createdUser;
//   }
// }

// export const userService = new UserService();
