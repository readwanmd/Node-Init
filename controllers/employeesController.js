const Employee = require('../model/Employee');

//File system ad DB
// const data = {
// 	employees: require('../model/employees.json'),
// 	setEmployees: function (data) {
// 		this.employees = data;
// 	},
// };

const getAllEmployees = async (req, res) => {
	// res.json(data.employees);

	const employees = await Employee.find();
	if (!employees)
		return res.status(204).json({ message: 'No employees found!' });

	res.json(employees);
};

const getEmployee = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: `ID is required.` });
	}
	// const employee = data.employees.find(
	// 	(employee) => employee.id === parseInt(req.params.id)
	// );
	const employee = await Employee.findOne({ _id: req.params.id }).exec();

	if (!employee) {
		return res
			.status(204)
			.json({ message: `No employee matches id-${req.body.id}` });
	}

	res.json(employee);
};

const createEmployee = async (req, res) => {
	// const newEmployee = {
	// 	id: data.employees[data.employees.length - 1].id + 1 || 1,
	// 	firstName: req.body.firstName,
	// 	lastName: req.body.lastName,
	// };

	if (!req?.body?.firstName || !req?.body?.lastName) {
		return res
			.status(400)
			.json({ message: 'first name and last name are required.' });
	}

	// if (!newEmployee.firstName || !newEmployee.lastName) {
	// 	return res
	// 		.status(400)
	// 		.json({ message: 'first name and last name are required.' });
	// }

	try {
		const result = await Employee.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		});

		res.status(201).json(result);
	} catch (err) {
		console.log(err);
	}
};

const updateEmployee = async (req, res) => {
	// const employee = data.employees.find(
	// 	(employee) => employee.id === parseInt(req.body.id)
	// );

	if (!req?.body?.id) {
		return res.status(400).json({ message: `ID is required.` });
	}

	const employee = await Employee.findOne({ _id: req.body.id }).exec();

	if (!employee) {
		return res
			.status(204)
			.json({ message: `No employee matches id-${req.body.id}` });
	}

	if (req.body?.firstName) employee.firstName = req.body.firstName;
	if (req.body.lastName) employee.lastName = req.body.lastName;

	// const filteredArray = data.employees.filter(
	// 	(emp) => emp.id !== parseInt(req.body.id)
	// );
	// const unSortedArray = [...filteredArray, employee];
	// data.setEmployees(
	// 	unSortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
	// );

	const result = await employee.save();

	res.status(200).json({
		message: `employee id-${req.body.id} updated successfully!`,
		data: result,
	});
};

const deleteEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: `ID is required.` });
	}
	// const employee = data.employees.find(
	// 	(employee) => employee.id === parseInt(req.body.id)
	// );
	const employee = await Employee.findOne({ _id: req.body.id }).exec();

	if (!employee) {
		return res
			.status(204)
			.json({ message: `No employee matches id-${req.body.id}` });
	}

	// const filteredArray = data.employees.filter(
	// 	(emp) => emp.id !== parseInt(req.body.id)
	// );
	// data.setEmployees([...filteredArray]);

	const result = await Employee.deleteOne({ _id: req.body.id });

	res.status(200).json({
		message: `employee id-${req.body.id} delleted successfully!`,
		data: result,
	});
};

module.exports = {
	getAllEmployees,
	getEmployee,
	createEmployee,
	updateEmployee,
	deleteEmployee,
};
