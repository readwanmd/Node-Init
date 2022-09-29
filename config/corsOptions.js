//Cross Origin Resource Sharing
const whitelist = [
	'https://www.mysite.com',
	'http://localhost:3500',
	'http://127.0.0.1:5000',
];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS!'));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
