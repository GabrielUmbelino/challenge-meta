import { Router } from "express";

import api from "./api";

const router = new Router();

export default router;

router.use("/api", api);
