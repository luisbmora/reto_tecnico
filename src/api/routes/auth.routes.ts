// import { Router } from 'express';
// import isAuth from '../middlewares/isAuth';
// import { celebrate } from 'celebrate';

// import { EnterpriseValidator } from '../validators/enterprise.validators';
// import * as UserHandlers from '../handlers/enterprise.handler';

// const route = Router();

// export default (app: Router) => 
//   app.use('/auth', route);


//   route.post(
//     '/login',
//     celebrate(EnterpriseValidator.login),
//     UserHandlers.loginUser
//   );

//   route.get(
//     '/logout/:id',
//     celebrate(EnterpriseValidator.getUser),
//     UserHandlers.logoutUser
//   );
// }