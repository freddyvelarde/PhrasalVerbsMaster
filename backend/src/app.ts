import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoutes from "./features/users/User.routes";
import cors from "cors";

class App {
  private readonly app: Application;
  private readonly PORT: number;

  public constructor() {
    this.app = express();
    this.configureServer();
    this.PORT = this.getPortServer();
    this.setupRoutes();
  }

  private getPortServer(): number {
    return parseInt(process.env.PORT || "8000", 10);
  }

  private configureServer() {
    dotenv.config();
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupRoutes() {
    this.app.use("/api/users", userRoutes);
  }

  public start() {
    this.app.listen(this.PORT, () =>
      console.log(`Server is running at http://localhost:${this.PORT}`),
    );
  }
}

export default App;
