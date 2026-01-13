import HttpService from "../services/http-service";

class UserFactory {
  async registerUser(reqObj: { username: string; password: string }) {
    const response = await HttpService.fetchData({
      path: "/register",
      method: "POST",
      body: {
        username: reqObj.username,
        password: reqObj.password,
      },
    });
    return response;
  }
  async login(reqObj: { username: string; password: string }) {
    const response = await HttpService.fetchData({
      path: "/login",
      method: "POST",
      body: {
        username: reqObj.username,
        password: reqObj.password,
      },
    });
    return response;
  }

  async logout() {
    const response = await HttpService.fetchData({
      path: "/logout",
      method: "POST",
    });
    return response;
  }
}

export default new UserFactory();
