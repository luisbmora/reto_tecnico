import { Router } from 'express';
import enterprise  from './routes/enterprises.routes';

export default () => {
	const app = Router();
    enterprise(app);
    return app
}