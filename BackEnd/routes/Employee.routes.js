const employee = require("../controller/employessData.js");

const employeeRoutes = (app) => {
  const router = require("express").Router();

  // Create a new Employee
  router.post("/", employee.createEmployee);

  // Retrieve all Employees
  router.get("/", employee.getAllEmployees);

  // Retrieve a single Employees with id
  router.get("/:id", employee.getEmployee);

  // Update a Employees with id
  router.put("/:id", employee.updateEmployee);

  // Delete a Employees with id
  router.delete("/:id", employee.deleteEmployee);

  // Delete all Employees
  router.delete("/", employee.deleteAllEmployees);

  app.use("/api/employees", router);
};

module.exports = employeeRoutes;
