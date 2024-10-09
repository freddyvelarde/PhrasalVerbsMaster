import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
// import User from "./User.model";
import { IPasswordSecurity } from "../../services/PasswordSecurity";
import { IUserValidator } from "./helpers/UserValidator";
import { IJwtServiceClass } from "../../services/JwtService";
import AuthController, { IAuthController } from "./Auth.controller";

interface IUserController extends IAuthController {
  getUsers(_req: Request, res: Response): void;
}

export default class UserController
  extends AuthController
  implements IUserController
{
  constructor(
    protected prisma: PrismaClient,
    protected passwordSecurity: IPasswordSecurity,
    protected userValidator: IUserValidator,
    protected jwtService: IJwtServiceClass,
  ) {
    super(prisma, passwordSecurity, userValidator, jwtService);
  }

  public getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.prisma.user.findMany();

      if (!this.userValidator.checkIfExistUsers(users)) {
        res.send({ message: "No users created yet." });
        return;
      }
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: "Failed to fetch users" });
    }
  };
}
