import { Router } from "express";
import indexController from "../../controllers/auth/user_auth";

const router = Router();

router.post("/new/user", indexController.create_new_user);

const user_router = router;
export default user_router;
