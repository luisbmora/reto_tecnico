import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { celebrate } from 'celebrate';
const userSeeder = require('../../seeds/users.seeds'); // Importa el seeder

// import { UserValidator } from '../validators/user.validator';
import * as UserHandlers from '../handlers/user.handler';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  //Routes
  route.get(
    '/',
    isAuth,
    // celebrate(UserValidator.getAll),
    UserHandlers.getUsers
  );

  route.get(
    '/me',
    isAuth,
  );

  route.post(
    '/',
    // isAuth,
    // celebrate(UserValidator.saveUser),
    UserHandlers.createUser
  );
  route.post(
    '/login',
    // celebrate(UserValidator.login),
    UserHandlers.loginUser
  );
  route.get(
    '/run/seeds',
    async (req, res) => {
      try {
        // Primero elimina los datos existentes
        await userSeeder.down();

        // Luego inserta los nuevos datos
        await userSeeder.up();
  
        res.send({ message: "Datos eliminados e insertados correctamente." });
      } catch (error) {
        console.error("Error al ejecutar los seeders:", error);
        res.status(500).send({ error: "Error al ejecutar los seeders." });
      }
    });
};