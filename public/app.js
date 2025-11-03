console.log("hi");

//global variables
const planktonAudio = new Audio("./audio/plankton.mp3");
const urchinAudio = new Audio("./audio/urchin.mp3");
const lobAudio = new Audio("./audio/lob.mp3");
const seaangelAudio = new Audio("./audio/seaangel.mp3");
const jellyAudio = new Audio("./audio/jelly.mp3");
const chordAudio = new Audio("./audio/chord.mp3");
const eelAudio = new Audio("./audio/eel.mp3");

let users = {};
let socket; //make sure this is declared in the global scope!
let userName;

// Ask for user's name
userName = prompt("Please enter your name:", "Anonymous");
if (!userName) userName = "Anonymous";

//Initialize and connect socket
socket = io();

//Listen for confirmation of connection
socket.on("connect", () => {
  console.log("Connected");
});

// Listen for messages named 'userData' from the server
socket.on("userData", function (data) {
  users[data.id] = data;
  console.log(users);
});

//share if one of the creatures is being pressed by someone to the server
//the server emits this back to the others
//then the soud is played for EVERYONE



//PLANKTON 1
let plankton = document.getElementById("plankton");
//listen for plankton pressed down
plankton.addEventListener("mousedown", (event) => {
  console.log("plankton is being clicked");
  socket.emit("plankton", { name: userName });
 // Listen for message 'plankton' from the server if it has been pressed
  socket.on("plankton", function (data) {
    planktonAudio.play();
    console.log("plankton is being pressed by:" + data.name);
  });
});
//MAYBE CHANGE THIS FEATURE/ASPECTS OF IT OUTSIDE OF SOCKET******
plankton.addEventListener("mouseup", (event) => {
  console.log("plankton is no longer clicked");
  socket.emit("plankton-not-pressed", { name: userName });
  // Listen for message 'plankton' from the server if it is no longer being pressed
  socket.on("plankton-not-pressed", function (data) {
    planktonAudio.pause();
    planktonAudio.currentTime = 0;
  });
});
//SEAWEED 2
let seaweed = document.getElementById("seaweed");
//listen for seaweed element being pressed
seaweed.addEventListener("mousedown", (event) => {
  console.log("seaweed was clicked");
  socket.emit("seaweed", { name: userName });
 //Listen from server if seaweed is being pressed
  socket.on("seaweed", function (data) {
    urchinAudio.play();
    console.log("seaweed is being pressed by:" + data.name);
  });
});
seaweed.addEventListener("mouseup", (event) => {
  console.log("seaweed is no longer clicked");
  socket.emit("seaweed-not-pressed", { name: userName });
  // Listen from server if seaweed is no longer being pressed
  socket.on("seaweed-not-pressed", function (data) {
    urchinAudio.pause();
    urchinAudio.currentTime = 0;
  });
});
//ANGLE 3
let angle = document.getElementById("angle");
//listen for angle element being pressed
angle.addEventListener("mousedown", (event) => {
  console.log("angle was clicked");
  socket.emit("angle", { name: userName });
  //Listen from server if angle is being pressed
  socket.on("angle", function (data) {
    seaangelAudio.play();
    console.log("angle is being pressed by:" + data.name);
  });
});
angle.addEventListener("mouseup", (event) => {
  console.log("angle is no longer clicked");
  socket.emit("angle-not-pressed", { name: userName });
  // Listen from server if angle is no longer being pressed
  socket.on("angle-not-pressed", function (data) {
    seaangelAudio.pause();
    seaangelAudio.currentTime = 0;
  });
});
//JELLYFISH 4
let jelly = document.getElementById("jelly");
//
jelly.addEventListener("mousedown", (event) => {
  console.log("jelly was clicked");
  socket.emit("jelly", { name: userName });
  //Listen from server if jelly is being pressed
  socket.on("jelly", function (data) {
    jellyAudio.play();
    console.log("jelly is being pressed by:" + data.name);
  });
});
jelly.addEventListener("mouseup", (event) => {
  console.log("jelly is no longer clicked");
  socket.emit("jelly-not-pressed", { name: userName });
  // Listen from server if jelly is no longer being pressed
  socket.on("jelly-not-pressed", function (data) {
    jellyAudio.pause();
  jellyAudio.currentTime = 0;
});
});
//URCHIN 5
let urchin = document.getElementById("urchin");
//listen for urchin element being pressed
urchin.addEventListener("mousedown", (event) => {
  console.log("urchin was clicked");
  socket.emit("urchin", { name: userName });
  //Listen from server if urchin is being pressed
  socket.on("urchin", function (data) {
    chordAudio.play();
    console.log("urchin is being pressed by:" + data.name);
  });
}); 
urchin.addEventListener("mouseup", (event) => {
  console.log("urchin is no longer clicked");
  socket.emit("urchin-not-pressed", { name: userName });
  // Listen from server if urchin is no longer being pressed
  socket.on("urchin-not-pressed", function (data) {
    chordAudio.pause();
    chordAudio.currentTime = 0;
  });
});
//EEL 6
let eel = document.getElementById("eel");//listen for eel element being pressed
eel.addEventListener("mousedown", (event) => {
  console.log("eel was clicked");
  socket.emit("eel", { name: userName });
  //Listen from server if eel is being pressed
  socket.on("eel", function (data) {
     lobAudio.play();
    console.log("eel is being pressed by:" + data.name);
  });});
eel.addEventListener("mouseup", (event) => {
  console.log("eel is no longer clicked");
  socket.emit("eel-not-pressed", { name: userName });
  // Listen from server if eel is no longer being pressed
  socket.on("eel-not-pressed", function (data) {
  eelAudio.pause();
  eelAudio.currentTime = 0;
});
});
//tracking the mouse move
document.addEventListener("mousemove", function (event) {
  const x = event.clientX;
  const y = event.clientY;
  console.log("mouse x:" + x + " mouse y:" + y);
  socket.emit("userData", { name: userName, x: x, y: y });
});

//draw cursrors -- not currently working, need to troubleshoot

function getCursorElement(id) {
  var elementId = "cursor-" + id;
  var element = document.getElementById(elementId);
  if (element == null) {
    element = document.createElement("div");
    element.id = elementId;
    element.className = "cursor";
    // Perhaps you want to attach these elements another parent than document
    document.appendChild(element);
  }
  return element;
}

socket.on("draw_cursor", function (data) {
  var el = getCursorElement(data.id);
  el.style.x = data.line[0].x;
  el.style.y = data.line[0].y;
});

//currently not using p5js -- keeping in case weneed it in the future
//set up my canvas
// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   // Ask for user's name
//   //   userName = prompt("Please enter your name:", "Anonymous");
//   //   if (!userName) userName = "Anonymous";

//   //Initialize and connect socket
//   //   socket = io();

//   //Listen for confirmation of connection
//   //   socket.on("connect", () => {
//   //     console.log("Connected");
//   //   });

//   // Listen for messages named 'userData' from the server
//   //   socket.on("userData", function (data) {
//   //     users[data.id] = data;
//   //     console.log(users);
//   //   });
// }

//draw function -- handle images on screen
// function draw() {
//
// }
//*
