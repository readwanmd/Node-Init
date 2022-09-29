const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3500;

const app = express();

//custome middleware for Logger
app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built in middleware for handle urlencoded data. In other words, form data
app.use(express.urlencoded({ extended: false }));

//built in middleware for JSON
app.use(express.json());

//middleware for serve static files
app.use(express.static(path.join(__dirname, 'public')));

//sub directories
app.use('/', require('./routes/root'));
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

app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}`);
});
