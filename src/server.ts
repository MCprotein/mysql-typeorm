import { createConnection, DataSource } from 'typeorm';
import app from '.';
import ormconfig from '../ormconfig';
import { userService } from './services/user.service';

const { PORT } = process.env;
if (process.env.NODE_ENV !== 'test') {
  console.log('호');
  createConnection(ormconfig)
    .then(async (connection: DataSource) => {
      console.log('정상적으로 Mysql 서버에 연결되었습니다.');
      await userService.create({
        username: '짱구',
        email: 'abcd@test.com',
        password1: '1234',
        password2: '1234',
      });
      const server = app.listen(PORT, () =>
        console.log(`server is running ${PORT}`)
      );
    })
    .catch((error) =>
      console.error(`\nMysql 연결에 실패하였습니다. \n ${error}`)
    );
}

// import { AppDataSource } from './data-source';
// import { User2 } from './entity/User';

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Inserting a new user into the database...');
//     const user = new User2();
//     user.username = '아오';
//     user.email = 'test@test.com';
//     user.password = '1234';
//     await AppDataSource.manager.save(user);
//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await AppDataSource.manager.find(User2);
//     console.log('Loaded users: ', users);

//     console.log(
//       'Here you can setup and run express / fastify / any other framework.'
//     );
//   })
//   .catch((error) => console.log(error));
