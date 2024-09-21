import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { celebrate } from 'celebrate';

// import { UserValidator } from '../validators/user.validator';
import * as UserHandlers from '../handlers/user.handler';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  //Routes
  route.get(
    '/',
    // isAuth,
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
};