const morgan = require("morgan");

module.exports = morgan(
  ":method :url :status :response-time ms"
);
