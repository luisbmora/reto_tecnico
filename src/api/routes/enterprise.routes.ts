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
}