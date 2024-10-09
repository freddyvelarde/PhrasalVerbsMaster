import express from "express";
import UserController from "./User.controller";
import PasswordSecurity from "../../services/PasswordSecurity";
import prisma from "../../core/config/db";
import UserValidator from "./helpers/UserValidator";
import JwtService from "../../services/JwtService";

const userRoutes = express.Router();
const passwordSecurity = new PasswordSecurity();
const userValidator = new UserValidator();

const jwtService = new JwtService();

const userController = new UserController(
  prisma,
  passwordSecurity,
  userValidator,
  jwtService,
);

userRoutes.get("/", jwtService.authenticateToken, userController.getUsers);
userRoutes.post("/", userController.createUser);

export default userRoutes;
