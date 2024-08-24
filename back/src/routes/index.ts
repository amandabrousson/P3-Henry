import { Router } from 'express';
import userRouter from './usersrouter';
import turnoRouter from './turnsrouter';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/turno', turnoRouter);

export default router;   