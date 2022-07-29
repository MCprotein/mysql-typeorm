import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { apiRouter } from './routes';

const app = express();

app.use(
  cors({
    origin: '*', // 모든 origin 허용
    credentials: true, // 쿠키 허용
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :date[web]'
  )
);

app.use('/api', apiRouter);

export default app;
