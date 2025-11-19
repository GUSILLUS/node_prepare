const fs = require('fs');


setTimeout(() => console.log('B'), 0);
setImmediate(() => console.log('A'));


fs.readFile(__filename, () => {
  console.log('C');
  setTimeout(() => console.log('D'), 0);
  setImmediate(() => console.log('E'));
});