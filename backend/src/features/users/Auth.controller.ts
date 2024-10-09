import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { IPasswordSecurity } from "../../services/PasswordSecurity";
import { IUserValidator } from "./helpers/UserValidator";
import { IJwtServiceClass } from "../../services/JwtService";
import User from "./User.model";

export interface IAuthController {
  createUser(req: Request, res: Response): void;
}

export default class AuthController implements IAuthController {
  constructor(
    protected prisma: PrismaClient,
    protected passwordSecurity: IPasswordSecurity,
    protected userValidator: IUserValidator,
    protected jwtService: IJwtServiceClass,
  ) {}

  public createUser = async (req: Request, res: Response) => {
    const user: User = req.body;

    const emailValidator = this.userValidator.checkEmail(user.email);

    if (!emailValidator.value) {
      res.send({ message: emailValidator.message });
      return;
    }

    const passwordValidator = this.userValidator.checkPassword(user.password);
    if (!passwordValidator.value) {
      res.send({ message: passwordValidator.message });
      return;
    }

    const nameValidator = this.userValidator.checkName(user.name);
    if (!nameValidator.value) {
      res.send({ message: passwordValidator.message });
      return;
    }

    const usernameValidator = this.userValidator.checkUsername(user.username);
    if (!usernameValidator.value) {
      res.send({ message: passwordValidator.message });
      return;
    }

    const passwordHashed = await this.passwordSecurity.hash(user.password);

    const userJustCreated = await this.prisma.user.create({
      data: {
        name: user.name,
        lastname: user.lastname,
        password: passwordHashed,
        email: user.email,
        username: user.username,
        avatar: user.avatar ? user.avatar : null,
      },
    });

    const token = this.jwtService.createToken(user.id);

    res.status(200).json({
      status: 200,
      message: "User created sucessfully.",
      token,
      user: userJustCreated,
      auth: true,
    });
  };
}
