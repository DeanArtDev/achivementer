import Provider from "../Provider";
import { AxiosRequestConfig } from "axios";
import { InputLogin, InputRegistration, LoginResponse, RegistrationResponse } from "./types";

class LoginProvider extends Provider {
  override path = "/user";

  public async login(data: InputLogin, options?: AxiosRequestConfig): Promise<LoginResponse> {
    try {
      this.shapePath("login");
      return await super.abstractPut<LoginResponse, InputLogin>(data, options, false);
    } finally {
      this.resetPath();
    }
  }

  public async register(data: InputRegistration, options?: AxiosRequestConfig): Promise<RegistrationResponse> {
    try {
      this.shapePath("registration");
      return await super.abstractPost<RegistrationResponse, InputRegistration>(data, options, false);
    } finally {
      this.resetPath();
    }
  }

  private resetPath(): void {
    this.path = "/user";
  }
}

export default new LoginProvider();
