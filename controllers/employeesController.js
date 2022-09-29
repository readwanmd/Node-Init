const data = {};
data.employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
	res.json(data.employees);
};

const getEmployee = (req, res) => {
	res.json({ id: req.params.id });
};

const createEmployee = (req, res) => {
	res.json({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});
};

const updateEmployee = (req, res) => {
	res.json({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});
};

const deleteEmployee = (req, res) => {
	res.json({ id: req.body.id });
};

module.exports = {
	getAllEmployees,
	getEmployee,
	createEmployee,
	updateEmployee,
	deleteEmployee,
};
