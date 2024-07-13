import http from 'http';
import { Server } from 'socket.io';

const createSocketServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["https://6690e70b521c87f6288b716f--guileless-otter-82d908.netlify.app",
         "http://localhost:3000",
        "https://669227249c1981e8d86b3c25--guileless-otter-82d908.netlify.app",
      "https://yoouuttuubbee.netlify.app"],
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });

  return server;
};

export default createSocketServer;