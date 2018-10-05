import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';

const app = express();

const router = express.Router();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to our app');
})


export default app;