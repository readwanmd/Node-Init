const data = {
	employees: require('../model/employees.json'),
	setEmployees: function (data) {
		this.employees = data;
	},
};

const getAllEmployees = (req, res) => {
	res.json(data.employees);
};

const getEmployee = (req, res) => {
	const employee = data.employees.find(
		(employee) => employee.id === parseInt(req.params.id)
	);

	if (!employee) {
		res
			.status(400)
			.json({ message: `employee id-${req.params.id} is not found` });
	}

	res.json(employee);
};

const createEmployee = (req, res) => {
	const newEmployee = {
		id: data.employees[data.employees.length - 1].id + 1 || 1,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};

	if (!newEmployee.firstName || !newEmployee.lastName) {
		return res
			.status(400)
			.json({ message: 'first name and last name are required.' });
	}

	data.setEmployees([...data.employees, newEmployee]);
	res.status(200).json({
		message: 'new employee added!',
		data: data.employees,
	});
};

const updateEmployee = (req, res) => {
	const employee = data.employees.find(
		(employee) => employee.id === parseInt(req.body.id)
	);

	if (!employee) {
		return res
			.status(400)
			.json({ message: `employee id-${req.body.id} is not found` });
	}

	if (req.body.firstName) employee.firstName = req.body.firstName;
	if (req.body.lastName) employee.lastName = req.body.lastName;

	const filteredArray = data.employees.filter(
		(emp) => emp.id !== parseInt(req.body.id)
	);
	const unSortedArray = [...filteredArray, employee];
	data.setEmployees(
		unSortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
	);

	res.status(200).json({
		message: `employee id-${req.body.id} updated successfully!`,
		data: data.employees,
	});
};

const deleteEmployee = (req, res) => {
	const employee = data.employees.find(
		(employee) => employee.id === parseInt(req.body.id)
	);

	if (!employee) {
		return res
			.status(400)
			.json({ message: `employee id-${req.body.id} is not found!` });
	}

	const filteredArray = data.employees.filter(
		(emp) => emp.id !== parseInt(req.body.id)
	);
	data.setEmployees([...filteredArray]);
	res.status(200).json({
		message: `employee id-${req.body.id} delleted successfully!`,
		data: data.employees,
	});
};

module.exports = {
	getAllEmployees,
	getEmployee,
	createEmployee,
	updateEmployee,
	deleteEmployee,
};
