import bcrypt from "bcrypt";

export interface IPasswordSecurity {
  hash(password: string): Promise<string>;
  check(supposedPassword: string, hashedPassword: string): Promise<boolean>;
}

export default class PasswordSecurity implements IPasswordSecurity {
  public async hash(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }
  public async check(
    supposedPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(supposedPassword, hashedPassword);
  }
}
