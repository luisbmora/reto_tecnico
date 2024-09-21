import expressLoader from './express';
import Logger from './logger';
import sequelize from './sequelize';

export default async ({ expressApp }) => {

    Logger.info('✌️ Jobs loaded');
    sequelize.sync();
    Logger.info('✌️ Sequelize loaded and sync!');
    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
  };