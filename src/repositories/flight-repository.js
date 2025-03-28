const { Sequelize } = require("sequelize")
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight); //call constru of parent class
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [{
        model: Airplane,
        requrired: true,
        as: "airplane_detail"
      }, {
        model: Airport,
        required: true,   //bcz join was making on the bases of airplane.id but we made custom airplan.code
        as: "departure_airport",
        on: {
          col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departure_airport.code"))
        },
        include: {
          model: City,
          required: true
        }
      }, {
        model: Airport,
        required: true,   //bcz join was making on the bases of airplane.id but we made custom airplan.code
        as: "arrival_airport",
        on: {
          col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrival_airport.code"))
        }, include: {
          model: City,
          required: true
          }
      }
    ]
    })
    return response;
  }
}

module.exports = FlightRepository;
