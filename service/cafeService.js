const Cafe = require("../models/cafeModel");
const { generateCafeUUID } = require("./utilities/uuid");

class CafeService {
  constructor(validator, cafeModel, db) {
    this.validator = validator;
    this.Cafe = cafeModel;
    this.db = db;
  }

  findAllCafe = (req, res) => {
    return new Promise((resolve, reject) => {
      const location = req.query.location;

      // if valid location params is provided
      if (location) {
        return this.findCafeByLocation(req, res)
          .then((response) => {
            response.forEach((cafe) => {
              if (cafe.logo) {
                const imageBuffer = cafe.logo;
                const base64IMage = Buffer.from(imageBuffer).toString("base64");
                cafe.logo = base64IMage;
              }
            });
            resolve(response);
          })
          .catch((err) => reject(err));
      }

      // no valid location params provided, will retrieve all cafes
      return this.Cafe.findAll()
        .then((response) => {
          response.forEach((cafe) => {
            if (cafe.logo) {
              const imageBuffer = cafe.logo;
              const base64IMage = Buffer.from(imageBuffer).toString("base64");
              cafe.logo = base64IMage;
            }
          });
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };

  findCafeByLocation = (req, res) => {
    return new Promise((resolve, reject) => {
      const location = req.query.location ?? req.params.location;

      return this.Cafe.findByLocation(location)
        .then((response) => {
          response.forEach((cafe) => {
            if (cafe.logo) {
              const imageBuffer = cafe.logo;
              const base64IMage = Buffer.from(imageBuffer).toString("base64");
              cafe.logo = base64IMage;
            }
          });
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };

  findCafeLocationByName = (req, res) => {
    return new Promise((resolve, reject) => {
      const name = req.params.name;

      return this.Cafe.findByName(name)
        .then((response) => {
          response.forEach((cafe) => {
            if (cafe.logo) {
              const imageBuffer = cafe.logo;
              const base64IMage = Buffer.from(imageBuffer).toString("base64");
              cafe.logo = base64IMage;
            }
          });
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  };

  updateCafe = (req, res) => {
    return new Promise(async (resolve, reject) => {
      let cafe = req.body;

      // validate cafe object
      if (!this.validator.validateCafe(cafe)) {
        reject("One or more information about Cafe not found");
      }

      // check if cafe record exists
      const cafeExists = await this.findCafeById(cafe.id);

      if (cafeExists.length === 0) {
        reject(`Cafe with id '${cafe.id}' does not exist`);
      }

      return this.Cafe.update(cafe)
        .then(() => {
          resolve(cafe);
        })
        .catch((err) => reject(err));
    });
  };

  findCafeByNameAndLocation = (cafeName, location) => {
    return new Promise(async (resolve, reject) => {
      return this.Cafe.findByNameAndLocation(cafeName, location)
        .then((response) => {
          response.forEach((cafe) => {
            if (cafe.logo) {
              const imageBuffer = cafe.logo;
              const base64IMage = Buffer.from(imageBuffer).toString("base64");
              cafe.logo = base64IMage;
            }
          });
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  createCafe = (req, res) => {
    return new Promise(async (resolve, reject) => {
      let cafe = req.body;

      // validate cafe object
      if (!this.validator.validateCafe(cafe)) {
        reject("One or more information about Cafe not found");
      }

      // generate new uuid
      cafe.id = generateCafeUUID();

      this.Cafe.create(cafe)
        .then(() => {
          resolve(cafe);
        })
        .catch((err) => {
          if (err.code === "ER_DUP_ENTRY") {
            reject(
              `Cafe '${cafe.name}' already exists in location '${cafe.location}'`
            );
          }
          reject(err);
        });
    });
  };

  findCafeById = (id) => {
    return this.Cafe.findById(id);
  };

  deleteCafeById = (req, res) => {
    return new Promise(async (resolve, reject) => {
      const id = req.params.id;

      // check if cafe exists
      const cafe = await this.findCafeById(id);

      // cafe not found
      if (cafe.length === 0) {
        reject({ message: `Cafe with id '${id}' does not exist` });
      }

      this.Cafe.deleteById(id)
        .then(() => {
          resolve("Cafe deleted");
        })
        .catch((err) => {
          reject(`Unable to delete cafe ${err}`);
        });
    });
  };
}

module.exports = CafeService;
