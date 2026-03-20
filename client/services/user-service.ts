import httpService from "./http-service";

class UserService {
  async registerUser(reqObj: { username: string; password: string }) {
    if (!reqObj.username) {
      throw new Error("Err");
    }
    if (!reqObj.password) {
      throw new Error("Err");
    }
    const response = await httpService.fetchData<{ success: boolean }>({
      relativeUrl: "/register",
      method: "POST",
      body: {
        username: reqObj.username,
        password: reqObj.password,
      },
    });
    return this.#handleResponse(response);
  }

  async login(reqObj: { username: string; password: string }) {
    if (!reqObj.username) {
      throw new Error("Err");
    }
    if (!reqObj.password) {
      throw new Error("Err");
    }
    const response = await httpService.fetchData<{ username: string }>({
      relativeUrl: "/login",
      method: "POST",
      body: {
        username: reqObj.username,
        password: reqObj.password,
      },
    });
    return this.#handleResponse(response);
  }

  async logout() {
    const response = await httpService.fetchData<{ success: boolean }>({
      relativeUrl: "/logout",
      method: "POST",
    });
    return this.#handleResponse(response);
  }

  #handleResponse<T>(response: T) {
    return response;
  }
}
export default new UserService();
