const validateCafe = (cafe) => {
  //name, description, location cannot be null
  return !(!cafe.name || !cafe.description || !cafe.location);
};

module.exports = { validateCafe };
