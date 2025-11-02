console.log("hi");

//global variables
const testAudio = new Audio("./audio/test 4.mp3");
const testAudioTwo = new Audio("./audio/test 2.mp3");
const testAudioThree = new Audio("./audio/test 3.mp3");
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

//listen for plankton pressed down

let plankton = document.getElementById("plankton");

plankton.addEventListener("mousedown", (event) => {
  console.log("plankton is being clicked");
  socket.emit("plankton", { name: userName });

  // Listen for message 'plankton' from the server if it has been pressed
  socket.on("plankton", function (data) {
    testAudio.play();
    console.log("plankton is being pressed by:" + data.name);
  });
});

plankton.addEventListener("mouseup", (event) => {
  console.log("plankton is no longer clicked");
  socket.emit("plankton-not-pressed", { name: userName });
  // Listen for message 'plankton' from the server if it is no longer being pressed
  socket.on("plankton-not-pressed", function (data) {
    testAudio.pause();
    testAudio.currentTime = 0;
  });
});

//listen for seaweed element being pressed

let seaweed = document.getElementById("seaweed");

seaweed.addEventListener("mousedown", (event) => {
  console.log("seaweed was clicked");
  testAudioTwo.play();
});

seaweed.addEventListener("mouseup", (event) => {
  console.log("seaweed is no longer clicked");
  testAudioTwo.pause();
  testAudioTwo.currentTime = 0;
});

//listen for angler element being pressed

let angler = document.getElementById("angler");

angler.addEventListener("mousedown", (event) => {
  console.log("angler was clicked");
  testAudioThree.play();
});

angler.addEventListener("mouseup", (event) => {
  console.log("angler is no longer clicked");
  testAudioThree.pause();
  testAudioThree.currentTime = 0;
});

//listen for angel element being pressed

let angel = document.getElementById("angel");

angel.addEventListener("mousedown", (event) => {
  console.log("angel was clicked");
  testAudioThree.play();
});

angel.addEventListener("mouseup", (event) => {
  console.log("angel is no longer clicked");
  testAudioThree.pause();
  testAudioThree.currentTime = 0;
});

//listen for urchin element being pressed

let urchin = document.getElementById("urchin");

urchin.addEventListener("mousedown", (event) => {
  console.log("urchin was clicked");
  testAudioThree.play();
});

urchin.addEventListener("mouseup", (event) => {
  console.log("urchin is no longer clicked");
  testAudioThree.pause();
  testAudioThree.currentTime = 0;
});

//listen for eel element being pressed

let eel = document.getElementById("eel");

eel.addEventListener("mousedown", (event) => {
  console.log("eel was clicked");
  testAudioThree.play();
});

eel.addEventListener("mouseup", (event) => {
  console.log("eel is no longer clicked");
  testAudioThree.pause();
  testAudioThree.currentTime = 0;
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
