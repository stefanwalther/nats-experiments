const stan = require('node-nats-streaming').connect('test-cluster', 'subscriber');

stan.on('connect', function() {
  let opts = stan.subscriptionOptions().setDeliverAllAvailable();
  let subscription = stan.subscribe('foo', opts);
  subscription.on('message', function(msg) {
    console.log('msg', msg);
    console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData());
  })
});

process.on('SIGINT', function() {
  console.log("Caught interrupt signal");

  stan.close();
  process.exit();

});
