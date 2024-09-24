import { Service } from "typedi";
import { IUser } from "../interfaces/IUser";
import moment from "moment";
import config from "../config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { APIError } from "../types/error/api-error";
import * as crypto from 'crypto';
import Loger from '../loaders/logger';
import { User } from "../models/user";
@Service()
export  class UserService {
  
    user: typeof User = User; // Modelo de usuario de Sequelize

  constructor() {}

  // Obtener todos los usuarios (Sequelize usa findAll en lugar de find)
  public async getUsers(): Promise<IUser[]> {
    try {
        const users = await this.user.findAll({
            attributes: { exclude: ['password'] } // Exclude password field
          });
      return users.map(user => user.toJSON() as IUser); // Convirtiendo a objeto JSON
    } catch (error) {
      Loger.error("Error al obtener los usuarios", error);
      throw error;
    }
  }

  // Crear un nuevo usuario
  public async createUser(body: any): Promise<any> {
    body.isActive = true;
    const hash = bcrypt.hashSync(body.password, 10); // Hash de la contraseña
    body.password = hash;
    try {
      const savedUser = await this.user.create(body); // Crear usuario en la base de datos
      return savedUser;
    } catch (error) {
      Loger.error("Error al crear el usuario", error);
      throw error;
    }
  }

  // Login del usuario
  public async login(body: any): Promise<any> {
    try {
      const user = await this.user.findOne({ 
        where: { email: body.email, isActive: true }
      });

      if (!user) {
        throw new APIError({ status: 401, message: 'Invalid credentials', stack: [] });
      }

      const passwordMatch = bcrypt.compareSync(body.password, user.password);
      if (passwordMatch) {
        // Generar token JWT y refresh token
        const jwtToken = this.generateJwtToken(user); // Guardar refresh token en la base de datos

        const response = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };

        return { response, token: jwtToken };
      } else {
        throw new APIError({ status: 401, message: 'Invalid credentials', stack: [] });
      }
    } catch (error) {
      Loger.error("Error en el login", error);
      throw error;
    }
  }

  // Logout del usuario
  public async logout(id: number): Promise<any> {
    try {
      const user = await this.user.findByPk(id);
      if (!user) {
        throw new APIError({ status: 404, message: 'User not found', stack: [] });
      }
    } catch (error) {
      Loger.error("Error al cerrar sesión", error);
      throw error;  
    }
  }

  // Generar JWT token
  private generateJwtToken(user: User) {
    const expirationTime = moment().add(15, 'minutes').unix();
    const payload = {
      sub: user.id,
      iat: moment().unix(),
      exp: expirationTime,
    };

    return jwt.sign(payload, config.jwtSecret);
  }


  // Obtener un usuario por su ID
  public async getUser(id: number): Promise<User | null> {
    return await this.user.findOne({ where: { id, isActive: true } });
  }
}
