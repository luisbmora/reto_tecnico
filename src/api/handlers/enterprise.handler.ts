import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { EnterpriseService } from '../../services/enterprise.service';
import { APIError } from "../../types/error/api-error";

export const getEnterprises = (req: Request, res: Response, next: NextFunction) => {
    const enterpriseService = Container.get(EnterpriseService);
    enterpriseService.getEnterprises()
        .then(enterprises => {
            res.json(enterprises)
        })
        .catch(next)
}

export const getEnterprise = (req: Request, res: Response, next: NextFunction) => {
    const enterpriseService = Container.get(EnterpriseService);
    const id = parseInt(req.params.id, 10); // Convertir el id a número
    enterpriseService.getEnterprise(id)
        .then(enterprise => {
            res.json(enterprise);
        })
        .catch(next);
}

export const createEnterprise = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const enterpriseService = Container.get(EnterpriseService);
    enterpriseService.createEnterprise(body)
        .then(enterprise => {
            res.json(enterprise)
        })
        .catch(next)
}

export const updateEnterprise = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10); // Convertir el id a número
    const body = req.body;
    const enterpriseService = Container.get(EnterpriseService);
    enterpriseService.updateEnterprise(id, body)
        .then(enterprise => {
            res.json(enterprise);
        })
        .catch(next);
}
export const deleteEnterprise = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10); // Convertir el id a número
    const enterpriseService = Container.get(EnterpriseService);

    try {
        const enterprise = await enterpriseService.deleteEnterprise(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof APIError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}