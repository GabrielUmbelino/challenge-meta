import HttpStatus from "http-status-codes";

import createError from "http-errors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import path from "path";
import router from "./router";

export default (port) => {
  const app = express();

  app.use(helmet());

  enableLogging(app);

  app.use(express.static(path.join(__dirname, "public")))
    .use("/", router)
    .use((req, res, next) => {
      next(createError(HttpStatus.NOT_FOUND));
    });

  handleErrors(app);

  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
};


function enableLogging (app) {
  app.use(logger("combined"));
}

function handleErrors (app) {
  app.use((err, req, res) => {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(status)
      .send({
        error: HttpStatus.getStatusText(status),
      });
  });
}
