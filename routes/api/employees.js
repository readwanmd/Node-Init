const express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require('../../controllers/employeesController');

router
	.route('/')
	.get(employeesController.getAllEmployees)
	.post(employeesController.createEmployee)
	.put(employeesController.updateEmployee)
	.delete(employeesController.deleteEmployee);

router.route('/:id').get(employeesController.deleteEmployee);

module.exports = router;
