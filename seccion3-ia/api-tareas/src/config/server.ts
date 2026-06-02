import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { config } from "./env.js";
import { connectTDB } from "./Db.js";

import taskRoutes from "../routes/task.routes.js";
import userRoutes from "../routes/user.routes.js";

class Server {
  private app: Application;
  private port: string | number;
  private apiPaths = {
    tasks: "/api/v1/tasks",
    user: "/api/v1/users",
  };

  constructor() {
    this.app = express();
    this.port = config.port;
    this.middlewares();
    this.conectarDB();
    this.routes();
  }

  private async conectarDB(): Promise<void> {
    try {
      await connectTDB();
      console.log("BD CONNECTION SUCESS");
    } catch (error) {
      console.error("ERROR TO CONNECT DB", error);
    }
  }

  private middlewares(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  private routes(): void {
    this.app.use(this.apiPaths.tasks, taskRoutes);
    this.app.use(this.apiPaths.user, userRoutes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`SERVER LISTEN ON PORT: ${this.port}`);
    });
  }
}

export default Server;
