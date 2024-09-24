import expressLoader from './express';
import Logger from './logger';
import sequelize from './sequelize';

export default async ({ expressApp }) => {
  try {
    Logger.info('✌️ Jobs loaded');

    // Sincronizar Sequelize
    Logger.info('Before Sequelize sync');
    await sequelize.sync();
    Logger.info('After Sequelize sync');
    Logger.info('✌️ Sequelize loaded and sync!');

    // Cargar Express
    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');

  } catch (error) {
    // Log de error mejorado para mostrar más detalles
    Logger.error('Error during application initialization:', error);
    
    // Convertir error a JSON si es necesario
    if (typeof error === 'object') {
      Logger.error('Error details:', JSON.stringify(error, null, 2));
    }

    throw error; // Relanzar el error para manejo en nivel superior
  }
};
