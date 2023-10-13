// Require the 'socket.io' library and create a WebSocket server on port 8900
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173", // Allow connections from this origin
  },
});

// Initialize an array to store user information (userId and socketId)
let users = [];

// Function to add a user to the 'users' array
const addUser = (userId, socketId) => {
  // Check if a user with the same 'userId' already exists in the array
  // If not, add the user to the array
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Function to remove a user from the 'users' array based on their 'socketId'
const removeUser = (socketId) => {
  // Filter the 'users' array to exclude the user with the specified 'socketId'
  users = users.filter((user) => user.socketId !== socketId);
};

// Function to get user information based on their 'userId'
const getUser = (userId) => {
  // Find and return the user in the 'users' array that matches the 'userId'
  return users.find((user) => user.userId === userId);
};

// Handle socket.io events when a user connects to the server
io.on("connection", (socket) => {
  // When a user connects, log a message
  console.log("a user connected.");

  // Handle the 'addUser' event, which is emitted by the client when a user joins
  socket.on("addUser", (userId) => {
    // Add the user to the 'users' array with their 'socketId'
    addUser(userId, socket.id);

    // Emit the 'getUsers' event to all clients, sending the updated 'users' array
    io.emit("getUsers", users);
  });

  // Handle the 'sendMessage' event, which is emitted by a client to send a message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // Find the user to whom the message is being sent
    const user = getUser(receiverId);

    // Emit the 'getMessage' event to the recipient's socket, sending the message data
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Handle the 'disconnect' event when a user disconnects from the server
  socket.on("disconnect", () => {
    // Log a message indicating that a user disconnected
    console.log("a user disconnected!");

    // Remove the disconnected user from the 'users' array
    removeUser(socket.id);

    // Emit the 'getUsers' event to all clients to update the user list
    io.emit("getUsers", users);
  });
});
