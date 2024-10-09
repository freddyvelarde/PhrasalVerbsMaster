// import User from "../User.model";

// import User from "../User.model";

//
type UserValidatorResponse = {
  message?: string;
  value: boolean;
};
export interface IUserValidator {
  checkEmail(email: string): UserValidatorResponse;
  checkPassword(password: string): UserValidatorResponse;
  checkName(name: string): UserValidatorResponse;
  checkUsername(username: string): UserValidatorResponse;
  checkIfExistUsers<T>(users: T[]): boolean;
}

export default class UserValidator implements IUserValidator {
  checkName(name: string): UserValidatorResponse {
    if (!name) {
      return { message: "Missing name field.", value: false };
    }

    if (name.length <= 2) {
      return {
        message:
          "Name too short, please add a name with more than 2 characters.",
        value: false,
      };
    }

    if (name.length >= 50) {
      return {
        message:
          "Name too long, please add a name with more than 2 characters.",
        value: false,
      };
    }

    return { value: true };
  }

  checkUsername(username: string): UserValidatorResponse {
    if (!username) {
      return { message: "Missing username field.", value: false };
    }

    if (username.length <= 2) {
      return { message: "Username too short.", value: false };
    }
    if (username.length > 50) {
      return { message: "Username too long.", value: false };
    }
    return { value: true };
  }

  checkPassword(password: string): UserValidatorResponse {
    if (!password) {
      return {
        message: "Missing password, please enter a secure password.",
        value: false,
      };
    }
    if (password.length <= 5)
      return {
        message:
          "Password too short, please enter a password with more than 5 characters",
        value: false,
      };

    if (password.length >= 100) {
      return {
        message:
          "Password too long, please enter a password with more than 5 characters",
        value: false,
      };
    }
    // Add more restrictions

    return { value: true };
  }

  public checkEmail(email: string): UserValidatorResponse {
    if (!email)
      return {
        message: "Missing Email, please send us a valid email",
        value: false,
      };

    if (email.length <= 3)
      return {
        message: "Email too short, please send us a valid email",
        value: false,
      };
    if (email.length >= 100) {
      return {
        message: "Email too long, please send us a valid email",
        value: false,
      };
    }

    return { message: "", value: true };
  }

  public checkIfExistUsers<T>(users: T[]): boolean {
    return users.length > 0;
  }
}
