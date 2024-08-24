import { Router } from 'express';
import { getUsers, getUsersById, createUser, loginUser, deleteUser} from "../controllers/UsersControllers";
import { validarDatosUser, verificarLogIn, checkUserExists, auth } from '../middlewares/autenticacion';


const userRouter: Router = Router();

userRouter.get("/", auth, getUsers);

userRouter.get("/:id", getUsersById);

userRouter.post("/register", validarDatosUser ,createUser);

userRouter.post("/login", verificarLogIn, loginUser);

userRouter.delete("/:id", checkUserExists, deleteUser);


export default userRouter;