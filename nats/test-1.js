const NATS = require('nats');
const moment = require('moment');
const nats = NATS.connect();

nats.subscribe('log.error', null, (msg) => {
  console.log(moment().format(), 'log.error => ', msg);
});

nats.subscribe('log.>', null, (msg) => {
  console.log(moment().format(), 'log.> => ', msg);
});

setInterval(() => {
  nats.publish('log.info', 'This is a "Hello World" log.info');
  nats.publish('log.error', 'This is a "Hello World" log.error');
}, 1000);


//nats.close();
