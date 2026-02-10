const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.get("/categories", employeeController.getCategories);
router.get("/subgodowns", employeeController.getSubGodowns);

// Static unified route must come before parametric routes
router.get("/unified", employeeController.getEmployeesUnified);
router.get("/", employeeController.getEmployees);
router.get("/:uuid", employeeController.getEmployeeById);
router.post("/", employeeController.addEmployee);
router.put("/:uuid", employeeController.updateEmployee);
router.delete("/:uuid", employeeController.deleteEmployee);
router.patch("/:uuid/status", employeeController.toggleEmployeeStatus);

module.exports = router;