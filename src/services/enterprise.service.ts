import { Service } from "typedi";
import { IEnterprise } from "../interfaces/IEnterprise";
import moment from "moment";
import config from "../config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { APIError } from "../types/error/api-error";
import * as crypto from 'crypto';
import Loger from '../loaders/logger';
import { Enterprises } from "../models/enterprises";


export class EnterpriseService {
    enterprise: typeof Enterprises = Enterprises; //Modelo de empresas de Sequelize

    constructor() {}

    // Obtener todas las empresas (Sequelize usa findAll en lugar de find)
    public async getEnterprises(limit = 10, offset = 0): Promise<IEnterprise[]> {
        try {
            const enterprises = await this.enterprise.findAll({
                where: {  },
                limit,     // Límite de resultados por página
                offset,    // Para la paginación, el offset indica desde qué registro empezar
                order: [['createdAt', 'DESC']]  // Ordenar por fecha de creación, descendente
            });
            return enterprises.map(enterprise => enterprise.toJSON() as IEnterprise);
        } catch (error) {
            Loger.error("Error al obtener las empresas", error);
            throw error;
        }
    }

    // Crear una nueva empresa
    public async createEnterprise(body: any): Promise<any> {
        body.isActive = true;
        try {
            const savedEnterprise = await this.enterprise.create(body); // Crear empresa en la base de datos
            return savedEnterprise;
        } catch (error) {
            Loger.error("Error al crear la empresa", error);
            throw error;
        }
    }

    // Obtener una empresa por su ID
    public async getEnterprise(id: number): Promise<Enterprises | null> {
        try {
            const enterprise = await this.enterprise.findByPk(id);
            return enterprise;
        } catch (error) {
            Loger.error("Error al obtener la empresa", error);
            throw error;
        }
    }

    public async updateEnterprise(id: number, body: any): Promise<Enterprises | null> {
        try {
            const enterprise = await this.enterprise.findByPk(id);
            if (!enterprise) {
                throw new APIError({ status: 404, message: 'Enterprise not found', stack: [] });
            }
            const updatedEnterprise = await enterprise.update(body);
            return updatedEnterprise;
        } catch (error) {
            Loger.error("Error al actualizar la empresa", error);
            throw error;
        }
    }

    public async deleteEnterprise(id: number): Promise<Enterprises | null> {
        try {
            const enterprise = await this.enterprise.findByPk(id);
            if (!enterprise) {
                throw new APIError({ status: 404, message: 'Enterprise not found', stack: []  });
            }
            const deletedEnterprise = await enterprise.update({ isActive: false });
            return deletedEnterprise;
        } catch (error) {
            Loger.error("Error al eliminar la empresa", error);
            throw error;
        }
    }
}