import App from './config/app';

const port = process.env.PORT || 3003;

App.listen(port, (err) => {
  if (err) {
    console.log(err); 
  } else {
    console.log(`App running on http://localhost:${port}`);
  }
});