const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services"); // services will handle all operations controller will structure the response
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
