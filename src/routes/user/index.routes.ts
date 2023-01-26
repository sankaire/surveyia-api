import { Router } from "express";
import indexContoller from "../../controllers/index.contoller";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/create/questionare",
  auth.ensure_is_authendicated,
  indexContoller.questionare.create_new_questionare
);
router.get(
  "/questionare/:questionare_id",
  indexContoller.questionare.get_questionare
);

router.post(
  "/questionare/:questionare_id",
  indexContoller.questionare.get_questionare_response
);
const admin_router = router;
export default admin_router;
