import express from 'express';
import 'reflect-metadata';
import { createConnection, DataSource } from 'typeorm';
import ormconfig from '../ormconfig';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
const app = express();
app.use(
  cors({
    origin: '*', // 모든 origin 허용
    credentials: true, // 쿠키 허용
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { PORT } = process.env;

app.use(express.static(__dirname));
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :date[web]'
  )
);

if (process.env.NODE_ENV !== 'test') {
  createConnection(ormconfig)
    .then(async (connection: DataSource) => {
      console.log('정상적으로 Mysql 서버에 연결되었습니다.');
      const server = app.listen(PORT, () =>
        console.log(`server is running ${PORT}`)
      );
    })
    .catch((error) =>
      console.error(`\nMysql 연결에 실패하였습니다. \n ${error}`)
    );
}

export default app;
