const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

emitter.on('hello', (name) => {
  console.log(`Привіт, ${name}!`);
});

emitter.emit('hello', 'Іване');

