import { Request, Response, NextFunction } from "express";
import Container from "typedi";
import UserService from "../../services/user.service";
import { APIError } from "../../types/error/api-error";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userService = Container.get(UserService);
  userService.getUser(id).then((resource) => res.json(resource))
  .catch(error => {
    res.status(404).json({ message: error.message });
  });;
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {

  // Obtener los parámetros de la consulta
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  // Obtener los filtros de la consulta
  const filters = {
    first_name: req.query.first_name as string,
    last_name: req.query.last_name as string,
    email: req.query.email as string,
  };

  const userService = Container.get(UserService);
  userService
    .getUsersPaginated(page, limit, filters)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const userService = Container.get(UserService);
  userService
    .createUser(body)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;

  const userService = Container.get(UserService);
  userService
    .login(user)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userService = Container.get(UserService);
  userService.logoutUser(id).then((resource) => res.json(resource));
};

export function updateUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const body = req.body;
  const userService = Container.get(UserService);
  userService.updateUser(id, body).then((resource) => res.json(resource));
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const userService = Container.get(UserService);
  
  try {
    const resource = await userService.deleteUser(id);
    res.json(resource);
  } catch (error) {
    if (error instanceof APIError) {
      console.log("***",error)
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
