// import * as Filters from "./filters";
import HttpStatus from "http-status-codes";
import { Router } from "express";

import { vehicles as db } from "../../db";

const router = new Router();
console.log("[vehicles/index.js log] vehicles");

export default router;

router
  .route("/:_id")
  .put((req, res) => {
    db.update(req.params, req.body, {}, (err, numReplaced) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        return;
      }

      if (!numReplaced) {
        res.status(HttpStatus.NOT_FOUND).send();
        return;
      }

      res.status(HttpStatus.OK).send();
    });
  })
  .delete((req, res) => {
    db.remove(req.params, {}, (err, numRemoved) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        return;
      }

      if (!numRemoved) {
        res.status(HttpStatus.NOT_FOUND).send();
        return;
      }

      res.status(HttpStatus.OK).send();
    });
  });

router
  .route("/")
  .post((req, res) => {
    console.log("[vehicles/index.js log] post vehicles");
    db.insert(req.body, (err, doc) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        return;
      }
      res.status(HttpStatus.OK).send(doc);
    });
  })
  .get((req, res) => {
    db.find(req.body, (err, docs) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        return;
      }

      res.status(HttpStatus.OK).send(docs);
    });
  });
