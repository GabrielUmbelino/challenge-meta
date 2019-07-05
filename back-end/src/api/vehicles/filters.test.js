import HttpStatus from "http-status-codes";
import { checkVehicleData } from "./filters";
let req = { body: {} };

const next = () => "next";

test("If the request has no chassisId throw error", () => {
  const res = {
    status: (status) => {
      const send = () => status;
      return { send };
    },
  };
  expect(checkVehicleData(req, res, next)).toBe(HttpStatus.BAD_REQUEST);
});

test("If the request has chassisId call next", () => {
  req = { body: { chassisId: {} } };
  expect(checkVehicleData(req, null, next)).toBe("next");
});
