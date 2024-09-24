import { Router } from 'express';
import isAuth from '../middlewares/isAuth';
import { celebrate } from 'celebrate';

import * as EnterpriseHandlers from '../handlers/enterprise.handler';

const route = Router();

export default (app: Router) => {
    app.use('/enterprise', route);

    //Routes
    route.get(
        '/',
        isAuth,
        // celebrate(UserValidator.getAll),
        EnterpriseHandlers.getEnterprises
    );

    route.get(
        '/me',
        isAuth,
    );

    route.post(
        '/',
        isAuth,
        // celebrate(UserValidator.saveUser),
        EnterpriseHandlers.createEnterprise
    );

    route.put(
        '/:id', // Ruta con ID de la empresa
        isAuth,
        // celebrate(UserValidator.updateEnterprise),
        EnterpriseHandlers.updateEnterprise
    );

    // Eliminar empresa
    route.delete(
        '/:id', // Ruta con ID de la empresa
        isAuth,
        EnterpriseHandlers.deleteEnterprise
    );
}