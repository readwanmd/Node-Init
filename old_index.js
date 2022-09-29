const logEvent = require('./middleware/logEvent');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

//innitialize object
const myEmitter = new MyEmitter();

//add listeners for log events
myEmitter.on('log', (msg) => logEvent(msg));

setTimeout(() => {
	//emit event
	myEmitter.emit('log', 'Log event emitted!');
}, 2000);
