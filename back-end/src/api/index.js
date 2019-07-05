// import * as Filters from "./vehicles/filters";
import { Router } from "express";

import bodyParser from "body-parser";

import vehicles from "./vehicles";

const router = new Router();
export default router;

router
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: false,
  }));

router
  .use("/vehicles", vehicles);
