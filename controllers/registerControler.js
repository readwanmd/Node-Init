const User = require('../model/User');

//JSON File was used for store data at begening
// const usersDB = {
// 	users: require('../model/users.json'),
// 	setUser: function (data) {
// 		this.users = data;
// 	},
// };

// const fsPromises = require('fs').promises;
// const path = require('path');

const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) {
		return res
			.status(400)
			.json({ message: 'username and password are required' });
	}

	//check if user already exists
	// const duplicate = usersDB.users.find((person) => person.username === user); //used for JSON in File System
	const duplicate = await User.findOne({ username: user }).exec();

	if (duplicate) {
		return res.sendStatus(409); //conflit
	}

	try {
		//encript password
		const hashedPwd = await bcrypt.hash(pwd, 10);
		//create & store new user in mongodb
		const result = await User.create({
			username: user,
			password: hashedPwd,
		});

		console.log(result);

		//store new user
		//used for JSON in File System
		// usersDB.setUser([...usersDB.users, newUser]);

		// await fsPromises.writeFile(
		// 	path.join(__dirname, '..', 'model', 'users.json'),
		// 	JSON.stringify(usersDB.users)
		// );
		// console.log(usersDB.users);

		res.status(201).json({ success: `New user ${user} created successfully!` });
	} catch (err) {
		res.status(500).json({ message: `${err.message}` });
	}
};

module.exports = { handleNewUser };
