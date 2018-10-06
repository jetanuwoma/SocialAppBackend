const dotenv = require('dotenv');

dotenv.config();

const config = ({
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
});

module.exports = config;
