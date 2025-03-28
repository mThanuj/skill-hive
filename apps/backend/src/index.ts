import { createServer } from "http";
import { app } from "./app";
import { Socket, Server as SocketServer } from "socket.io";

const httpServer = createServer(app);
const PORT: number = parseInt(process.env.PORT!, 10);
const io: SocketServer = new SocketServer(httpServer, {
  cors: {
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`${new Date()} User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`${new Date()} User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`${new Date()} Server is running on http://localhost:${PORT}`);
});
