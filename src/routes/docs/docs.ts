import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swagger_document from "../../../docs/docs.json";

const router = Router();

router.use("/docs", swaggerUI.serve, swaggerUI.setup(swagger_document));

const docs_router = router;

export default docs_router;
