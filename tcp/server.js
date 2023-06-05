var net = require("net");

var server = net.createServer(function (socket) {
  socket.write("Echo from server\r\n");

  // Handle data received from the client
  socket.on("data", (data) => {
    const message = data.toString();
    console.log("Received from client: " + message);
  });

//   socket.pipe(socket);
});

server.listen(1337, "127.0.0.1");
