import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { UserService } from "../../services/user.service";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  return res.json({ user: 'user' }).status(200);
}

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const userService = Container.get(UserService);
  userService.getUsers()
    .then(users => {
      res.json(users)
    })
    .catch(next)
}

export const deleteUser = (req, res, next) => {
  const userService = Container.get(UserService)

}

export const createUser = (req: Request, res: Response, next: NextFunction) => {

  const body = req.body;
  const url = req.headers.referer;
  const userService = Container.get(UserService)
  userService.createUser(body).then(user => {
    res.json(user)
  }).catch(next)

}

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const ipAddress = req.ip;
  
  const userService = Container.get(UserService)
  userService.login(user).then(response => {
    // res.json(user)
    // Si la autenticación es exitosa, establecer la cabecera de autenticación y enviar la respuesta.
    if (response.token && response.response) {
      res.json(response);
    } else {
      // En caso de un error inesperado
      return res.status(500).json({ error: 'Error inesperado durante la autenticación.' });
    }
  }).catch(next)
}