import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT || '3002', 10),
  databaseURL: process.env.MONGODB_URI,
  db_name: process.env.DB_DATABASE,            
  db_user: process.env.DB_USER,            
  db_password: process.env.DB_PASSWORD,    
  db_host: process.env.DB_HOST,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: '/api',
  },
};