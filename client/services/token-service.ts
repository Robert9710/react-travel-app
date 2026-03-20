import httpService from "./http-service";

class TokenService {
  async getToken() {
    const response = await httpService.fetchData<{ success: boolean }>({
      relativeUrl: "/token",
      method: "POST",
    });
    return this.#handleResponse(response);
  }

  #handleResponse<T>(response: T) {
    return response;
  }
}
export default new TokenService();
