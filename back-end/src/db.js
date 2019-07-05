import Datastore from "nedb";
import path from "path";
const os = require("os");

const instances = {};

export const vehicles = getInstance("vehicles");
vehicles.ensureIndex({
  fieldName: "chassisSeries",
});

function getInstance (name) {
  if (!instances[name]) {
    instances[name] = new Datastore({
      autoload: true,
      filename: path.join(os.homedir(), ".fleet-manager", "db", `${name}.db`),
    });
  }
  return instances[name];
}
