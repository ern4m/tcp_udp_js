var net = require("net");
const { promisify } = require("util");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();

async function startClient() {
  client.connect(1337, "127.0.0.1", () => {
    console.log("Connected to the server.");
    sendMessage();
  });

  client.on("data", (data) => {
    console.log("\nReceived from server: " + data.toString());
  });

  client.on("close", () => {
    console.log("\nConnection closed.");
    rl.close();
  });
}

async function sendMessage() {
  const question = promisify(rl.question).bind(rl);
  const message = await question("\nEnter a message: ");

  // Send the user input to the server
  client.write(message);

  // Ask for the next message
  sendMessage();
}

startClient();
