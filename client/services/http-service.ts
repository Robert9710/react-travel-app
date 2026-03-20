import appConfig from "../application/config.json";
import { ApiError } from "../utilities/error";
import tokenService from "./token-service";

class HttpService {
  #apiDomain;
  constructor() {
    this.#apiDomain = appConfig.apiDomain;
  }
  async fetchData<T>(reqObj: {
    relativeUrl: string;
    method?: string;
    body?: Record<string, string | number | string[]>;
  }): Promise<T> {
    const url = this.#apiDomain + reqObj.relativeUrl;
    const options: RequestInit = {
      method: reqObj.method || "GET",
      credentials: "include",
    };
    const httpHeaders: HeadersInit = { "Content-Type": "application/json" };
    if (options.method !== "GET") {
      httpHeaders["CSRF-Token"] = this.#getCsrfToken();
    }
    options.headers = new Headers(httpHeaders);
    if (reqObj.body) {
      options.body = JSON.stringify(reqObj.body);
    }
    const response = await fetch(url, options);
    if (response.status === 204 || response.status === 304) {
      return undefined as T;
    } else {
      let parsedResponse;
      try {
        parsedResponse = await response.json();
      } catch {
        throw new Error("Error while parsing response");
      }
      if (parsedResponse?.error) {
        switch (parsedResponse.error.errorCode) {
          case "401-100":
          case "403-100": {
            await tokenService.getToken();
            const retry = await fetch(url, options);
            return await retry.json();
          }
          default: {
            throw new ApiError(parsedResponse.error.errorCode);
          }
        }
      }
      return parsedResponse;
    }
  }

  #getCsrfToken() {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrf_token="))
        ?.split("=")[1] || ""
    );
  }
}

export default new HttpService();
