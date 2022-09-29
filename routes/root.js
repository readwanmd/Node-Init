const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World!');
});

router.get('/index(.html)?', (req, res) => {
	// res.sendFile('./views/index.html', { root: __dirname });
	//another way
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

//Route handler
router.get(
	'/hello',
	(req, res, next) => {
		console.log('Helloooooooo!');
		next();
	},
	(req, res, next) => {
		res.send('Hello!');
	}
);

//Route handler Clean Way

const one = (req, res, next) => {
	console.log('One');
	next();
};

const two = (req, res, next) => {
	console.log('Two');
	next();
};

const three = (req, res, next) => {
	console.log('Three');
	res.send('Finished!');
};

router.get('/route-chain', [one, two, three]);

module.exports = router;
