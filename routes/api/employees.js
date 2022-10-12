const express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require('../../controllers/employeesController');
const verifyJwt = require('../../middleware/verifyJWT');

router
	.route('/')
	.get(verifyJwt, employeesController.getAllEmployees)
	.post(employeesController.createEmployee)
	.put(employeesController.updateEmployee)
	.delete(employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;
