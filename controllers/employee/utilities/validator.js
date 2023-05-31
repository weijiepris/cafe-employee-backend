const validateEmployee = (employee) => {
  //name, email_address, phone_number, gender cannot be null
  return !(
    !employee.name ||
    !employee.email_address ||
    !employee.phone_number ||
    !employee.gender
  );
};

module.exports = { validateEmployee };
