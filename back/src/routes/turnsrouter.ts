import { Router } from 'express';
import { getAllTurnos, getTurnoById, createTurno, cancelturno } from "../controllers/turnsController"
/* import auth from "../middlewares/autenticacion"; */
import { validarDatosTurnos, validarFechasTurnos } from '../middlewares/autenticacion';


const turnoRouter: Router = Router();

turnoRouter.get("/", getAllTurnos)

turnoRouter.get("/:id", getTurnoById)

turnoRouter.post("/schedule", validarDatosTurnos, validarFechasTurnos ,createTurno)

turnoRouter.put("/cancel/:id", cancelturno)

export default turnoRouter;