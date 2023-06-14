class EmployeeCafeService {
  constructor(employeeCafeModel) {
    this.EmployeeCafe = employeeCafeModel;
  }

  createEmployeeCafe(employeeCafe) {
    return this.EmployeeCafe.create(employeeCafe);
  }

  updateEmployeeCafe(employeeCafe) {
    return this.EmployeeCafe.update(employeeCafe);
  }

  findById(id) {
    return this.EmployeeCafe.findById(id);
  }

  deleteById(id) {
    return this.EmployeeCafe.deleteById(id);
  }
}

module.exports = EmployeeCafeService;
