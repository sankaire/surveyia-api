import { Router } from "express";
import indexController from "../../controllers/auth/user_auth";

const router = Router();

router.post("/signup", indexController.create_new_user);
router.post("/signin", indexController.sign_in);

const user_router = router;
export default user_router;
