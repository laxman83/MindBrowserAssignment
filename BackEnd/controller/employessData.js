const db = require("../Model");
const EmployeeInfos = db.EmployeeInfos;
const Op = db.Sequelize.Op;

// Create and Save a new Employee
const createEmployee = (req, res) => {
  try {
    // Create a Tutorial
    const today = new Date();
    const employee = {
      empid: req.body.empid,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      dob: req.body.dob,
      mobile: req.body.mobile,
      city: req.body.city,
      created: today,
    };
    // Save employeeData in the database
    EmployeeInfos.findOne({
      where: {
        empid: req.body.empid,
      },
    }).then((user) => {
      if (!user) {
        EmployeeInfos.create(employee).then((user) => {
          res.status(200).send({ status: "employee added successfully", user });
        });
      } else {
        res.send({ error: "employee already exists" });
      }
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

// Retrieve all Employee from the database.
const getAllEmployees = (req, res) => {
  try {
    EmployeeInfos.findAll().then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

// Find a single Employee with an id
const getEmployee = (req, res) => {
  try {
    console.log("inside findOne", req.param.id);
    const id = req.params.id;

    EmployeeInfos.findByPk(id).then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(500).send({
      message: "Something is missing",
    });
  }
};

// Update a Employee by the id in the request
const updateEmployee = (req, res) => {
  try {
    const id = req.params.id;
    EmployeeInfos.update(req.body, {
      where: { id: id },
    }).then((empData) => {
      if (empData == 1) {
        res.send({
          message: "Employee information was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Employee details with id=${id}. Maybe employee data  was not found or req.body is empty!`,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating employee details with id=" + id,
    });
  }
};

// Delete a Employee with the specified id in the request
const deleteEmployee = (req, res) => {
  try {
    const id = req.params.id;
    EmployeeInfos.destroy({
      where: { id: id },
    }).then((data) => {
      if (data == 1) {
        res.status(200).send({
          message: "Employee data was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Employee data with id=${id}. Maybe employee data was not found!`,
        });
      }
    });
  } catch (err) {}
};

// Delete all Employee from the database.
const deleteAllEmployees = (req, res) => {
  try {
    EmployeeInfos.destroy({
      where: {},
      truncate: false,
    }).then((data) => {
      res.send({ message: `${data} EmployeeInfo were deleted successfully!` });
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all tutorials.",
    });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  deleteAllEmployees,
};
