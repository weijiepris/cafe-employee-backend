const validateEmployee = (employee) => {
  //name, email_address, phone_number, gender cannot be null
  return !(
    !employee.name ||
    !employee.email_address ||
    !employee.phone_number ||
    !employee.gender
  );
};

const validateEmployeeWithId = (employee) => {
  //name, email_address, phone_number, gender cannot be null
  return !(
    !employee.id ||
    !employee.name ||
    !employee.email_address ||
    !employee.phone_number ||
    !employee.gender
  );
};
const validateCafe = (cafe) => {
  //name, description, location cannot be null
  return !(!cafe.name || !cafe.description || !cafe.location);
};

const transformDate = (employee) => {
  let date_start = employee.tempDateStart;
  let date_end = employee.tempDateEnd;

  const temp_start = new Date(date_start);
  if (isNaN(temp_start.getTime())) {
    employee.date_start = null;
  } else {
    employee.date_start = new Date(date_start);
  }

  const temp_end = new Date(date_end);
  if (isNaN(temp_end.getTime())) {
    employee.date_end = null;
  } else {
    employee.date_end = new Date(date_end);
  }
  delete employee.tempDateStart;
  delete employee.tempDateEnd;
};

module.exports = {
  validateEmployee,
  validateEmployeeWithId,
  validateCafe,
  transformDate,
};
