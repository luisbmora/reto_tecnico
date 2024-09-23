// sequelize.ts
import { Sequelize } from 'sequelize-typescript';
import config from '../config/index';
import { User } from '../models/user';
import { Enterprises} from '../models/enterprises';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.db_host,
  username: config.db_user,
  password: config.db_password,
  database: config.db_name,
});
sequelize.addModels([User, Enterprises]);


export default sequelize;