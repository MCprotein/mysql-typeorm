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
