//Utilicé IA de chatGPT para crear este archivo y agilizar el llenado de usuarios 

'use strict';
const bcrypt = require('bcrypt');
// const { sequelize } = require('../loaders/sequelize').default;
import sequelize from '../loaders/sequelize';
import { User } from '../models/user';


// Función para encriptar la contraseña
const encryptPassword = (password) => bcrypt.hashSync(password, 10);
// Definición de los usuarios
const users = [
  {
    name: 'José Mora',
    email: 'jose@example.com',
    password: encryptPassword('password123'),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Julia Mora',
    email: 'julia@example.com',
    password: encryptPassword('password123'),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Guadalupe Barajas',
    email: 'lupita@example.com',
    password: encryptPassword('password123'),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Julian Barajas',
    email: 'julian@example.com',
    password: encryptPassword('password123'),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Paty Mora',
    email: 'paty@example.com',
    password: encryptPassword('password123'),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Función para insertar usuarios (up)
const runUp = async () => {
  await sequelize.models.User.bulkCreate(users);
  console.log('Usuarios insertados correctamente.');
};

// Función para eliminar usuarios (down)
const runDown = async () => {
  await sequelize.models.User.destroy({ where: {}, truncate: true });
  console.log('Usuarios eliminados correctamente.');
};

// Exporta las funciones para que puedan ser ejecutadas desde el servicio
module.exports = {
  up: runUp,
  down: runDown
};
