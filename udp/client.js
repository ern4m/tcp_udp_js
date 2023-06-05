const dgram = require('dgram');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = dgram.createSocket('udp4');

client.on('message', (msg) => {
  console.log(`Received from server: ${msg.toString()}`);
});

client.on('close', () => {
  console.log('Client socket closed.');
  rl.close();
});

function sendMessage() {
  rl.question('Enter a message: ', (message) => {
    const buffer = Buffer.from(message);
    client.send(buffer, 0, buffer.length, 1337, 'localhost', (err) => {
      if (err) {
        console.log('Error occurred while sending message:', err);
      }
    });

    // Ask for the next message
    sendMessage();
  });
}

client.bind(() => {
  console.log('UDP client started.');

  // Start sending messages
  sendMessage();
});
