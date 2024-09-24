import { Router } from 'express';
import user from './routes/user.routes';
import enterprise from './routes/enterprise.routes';

export default () => {
	const app = Router();
    user(app);
    enterprise(app);
    return app
}