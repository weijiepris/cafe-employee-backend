const Cafe = require("../models/cafeModel");
const { validateCafe } = require("./utilities/validator");
const { generateCafeUUID } = require("./utilities/uuid");

const CafeService = {};

CafeService.findAllCafe = (req, res) => {
  return new Promise((resolve, reject) => {
    const location = req.query.location;

    // if valid location params is provided
    if (location) {
      return CafeService.findCafeByLocation(req, res)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    }

    // no valid location params provided, will retrieve all employees
    return Cafe.findAll()
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

CafeService.findCafeByLocation = (req, res) => {
  return new Promise((resolve, reject) => {
    const location = req.query.location;

    return Cafe.findByLocation(location)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

CafeService.updateCafe = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let cafe = req.body;

    // validate cafe object
    if (!validateCafe(cafe)) {
      reject("One or more information about Cafe not found");
    }

    // check if cafe record exist
    const cafeExists = await CafeService.findCafeById(cafe.id).then(
      (response) => response
    );

    if (cafeExists.length === 0) {
      reject(`Cafe with id '${cafe.id}' does not exist`);
    }

    return Cafe.update(cafe)
      .then(() => {
        resolve(cafe);
      })
      .catch((err) => reject(err));
  });
};

CafeService.findCafeByNameAndLocation = (cafeName, location) => {
  return new Promise(async (resolve, reject) => {
    return Cafe.findByNameAndLocation(cafeName, location)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// CafeService.findCafeByLocation = (location) => {
//   return Cafe.findByLocation(location);
// };

// CafeService.updateCafe = (cafe) => {
//   return Cafe.update(cafe);
// };

CafeService.createCafe = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let cafe = req.body;

    // validate cafe object
    if (!validateCafe(cafe)) {
      reject("One or more information about Cafe not found");
    }

    // generate new uuid
    cafe.id = generateCafeUUID();

    Cafe.create(cafe)
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

CafeService.findCafeById = (id) => {
  return Cafe.findById(id);
};

CafeService.deleteCafeById = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const id = req.body.id;

    // check if cafe exists
    const cafe = await CafeService.findCafeById(id);

    // cafe not found
    if (cafe.length === 0) {
      reject({ message: `Cafe with id '${id}' does not exist` });
    }

    Cafe.deleteById(id)
      .then(() => {
        resolve("Cafe deleted");
      })
      .catch((err) => {
        reject(`Unable to delete cafe ${err}`);
      });
  });
};

module.exports = CafeService;
