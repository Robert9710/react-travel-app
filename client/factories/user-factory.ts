import userService from "../services/user-service";

class UserFactory {
  async registerUser(reqObj: { username: string; password: string }) {
    const response = await await userService.registerUser({
      username: reqObj.username,
      password: reqObj.password,
    });
    return response;
  }

  async login(reqObj: { username: string; password: string }) {
    const response = await userService.login({
      username: reqObj.username,
      password: reqObj.password,
    });
    return response;
  }

  async logout() {
    const response = await userService.logout();
    return response;
  }
}

export default new UserFactory();
