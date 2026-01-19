import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import artworkRoutes from "./routes/artwork.routes";
import adminRoutes from "./routes/admin.routes";
import auctionRoutes from "./routes/auction.routes";
import orderRoutes from "./routes/order.routes";
import { initAuctionStartWorker } from "./workers/auctionLive.worker";

const app: Application = express();
const server = http.createServer(app);

// Initialize socket io
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

// Socket io middleware
io.use((socket, next) => {
  const cookie = socket.request.headers.cookie;

  if (!cookie) {
    socket.data.user = null;
    return next();
  }

  const token = cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    socket.data.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.data.user = decoded;
  } catch (error) {
    socket.data.user = null;
  }
  next();
});

// Websocket event handlers
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-auction", (auctionId: string) => {
    socket.join(auctionId);
  });

  socket.on("leave-auction", (auctionId: string) => {
    socket.leave(auctionId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    initAuctionStartWorker();

    const PORT = process.env.PORT || 4500;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
};

startServer();
