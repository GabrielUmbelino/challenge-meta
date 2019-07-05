import HttpStatus from "http-status-codes";


export const checkVehicleData = (req, res, next) => {
  const vehicle = req.body;
  if (!vehicle.hasOwnProperty("chassisId")) {
    res.status(HttpStatus.BAD_REQUEST).send();
    return HttpStatus.BAD_REQUEST;
  }

  return next();
};
