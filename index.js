//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize HTTP server
let http = require("http");
let server = http.createServer(app);

//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);
let users = {};

//Listen for a client to connect and disconnect
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

  socket.on("userData", function (data) {
    // Add socket id to user data
    data.id = socket.id;

    // Store user data
    users[socket.id] = data;

    console.log(data);

    // Broadcast updated user data to all clients
    io.sockets.emit("userData", data);
  });

  //listen for plankton mousedown
  socket.on("plankton", function (data) {
    console.log("plankton is being pressed by " + data.name);

    //send this info to everyone
    io.emit("plankton", data);
  });

  //listen for plankton mouseup
  socket.on("plankton-not-pressed", function (data) {
    console.log("plankton is not being pressed by " + data.name);

    //send this info to everyone
    io.emit("plankton-not-pressed", data);
  });

  //draw cursor - not working rn
  socket.on("draw_cursor", (data) => {
    io.emit("draw_cursor", { line: data.line, id: socket.id });
  });
});

//'port' variable allows for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("App listening at port: " + port);
});

//listen for ghost location - old code, here for ref
//   socket.on("ghost", (data) => {
//     console.log("Received 'ghost' with the following data:");
//     console.log(data);

//     //Send data to ALL clients, including this one
//     io.emit("ghost", data);
//   });
