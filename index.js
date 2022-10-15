require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');
const verifyJwt = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

//connect to mongodb
connectDB();

const app = express();

//custome middleware for Logger
app.use(logger);

//handle options credentials check - before CORS
//and fetch cookies credentials requiements
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built in middleware for handle urlencoded data. In other words, form data
app.use(express.urlencoded({ extended: false }));

//built in middleware for JSON
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//middleware for serve static files
app.use(express.static(path.join(__dirname, 'public')));

//sub directories
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJwt);
app.use('/employees', require('./routes/api/employees'));

//All other routes
app.all('*', (req, res) => {
	res.status(404);

	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({ error: '404 not found' });
	} else {
		res.type('txt').send('404 Not Found');
	}
});

//error handlers
app.use(errorHandler);

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB!');

	app.listen(PORT, function () {
		console.log(`Listening on port ${PORT}`);
	});
});
