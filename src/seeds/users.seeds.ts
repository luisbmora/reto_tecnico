//Utilicé IA de chatGPT para crear este archivo y agilizar el llenado de usuarios 

'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: 'José Mora',
        email: 'jose@example.com',
        password: bcrypt.hashSync('password123', 10), // Encripta la contraseña
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Julia Mora',
        email: 'julia@example.com',
        password: bcrypt.hashSync('password123', 10),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Guadalupe Barajas',
        email: 'lupita@example.com',
        password: bcrypt.hashSync('password123', 10),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Julian Barajas',
        email: 'julian@example.com',
        password: bcrypt.hashSync('password123', 10),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Paty Mora',
        email: 'paty@example.com',
        password: bcrypt.hashSync('password123', 10),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {}); // Inserta los usuarios en la tabla "Users"
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina los datos de la tabla en caso de revertir el seeder
    await queryInterface.bulkDelete('Users', null, {});
  }
};
