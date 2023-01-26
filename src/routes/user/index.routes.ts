import { Router } from "express";
import indexContoller from "../../controllers/index.contoller";
import ensure_is_authendicated from "../../middleware/auth";
import auth from "../../middleware/auth";

const router = Router();

router.use(auth.ensure_is_authendicated);

router.post(
  "/create/questionare",
  indexContoller.questionare.create_new_questionare
);

const admin_router = router;
export default admin_router;
