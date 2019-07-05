const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    index: ["./src/index.js"],
  },
  externals: [nodeExternals()],
  mode: "production",
  target: "node",
};
