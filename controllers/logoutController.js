const User = require('../model/User');

//File system ad DB
// const usersDB = {
// 	users: require('../model/users.json'),
// 	setUser: function (data) {
// 		this.users = data;
// 	},
// };

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
	//on client, also delete accessToken

	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(204); //no content
	}

	const refreshToken = cookies.jwt;

	//is the refresh token in DB?
	// const foundUser = usersDB.users.find(
	// 	(person) => person.refreshToken === refreshToken
	// );
	const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		return res.sendStatus(204);
	}

	//delete the refresh token in DB
	// const otherUsers = usersDB.users.filter(
	// 	(person) => person.refreshToken !== foundUser.refreshToken
	// );

	// const currentUser = { ...foundUser, refreshToken: '' };
	// usersDB.setUser([...otherUsers, currentUser]);

	// await fsPromises.writeFile(
	// 	path.join(__dirname, '..', 'model', 'users.json'),
	// 	JSON.stringify(usersDB.users)
	// );

	foundUser.refreshToken = '';
	const result = await foundUser.save();
	console.log(result);

	res.clearCookie('jwt', { httpOnly: true }); //secure:true - only serves on HTTPS
	res.sendStatus(204);
};

module.exports = { handleLogout };
