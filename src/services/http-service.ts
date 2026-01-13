import appConfig from "../application/config.json";

class HttpService {
  #apiDomain;
  constructor() {
    this.#apiDomain = appConfig.apiDomain;
  }
  async fetchData(reqObj: {
    path: string;
    method?: string;
    queryParams?: Record<string, string>;
    body?: Record<string, string | number>;
  }) {
    let url = this.#apiDomain + reqObj.path;
    const options: RequestInit = {
      method: reqObj.method || "GET",
      credentials: "include",
    };
    const httpHeaders: HeadersInit = { "Content-Type": "application/json" };
    if (options.method !== "GET") {
      httpHeaders["CSRF-Token"] = this.#getCsrfToken();
    }
    options.headers = new Headers(httpHeaders);
    if (reqObj.queryParams) {
      url += "?" + new URLSearchParams(reqObj.queryParams);
    }
    if (reqObj.body) {
      options.body = JSON.stringify(reqObj.body);
    }
    const response = await fetch(url, options);
    if (response.status === 403) {
      await this.getToken({ url, options });
      // return await this.fetchData(reqObj);
    } else {
      if (response.status !== 204) {
        const res = await response.json();
        console.log("Fetched res: ", res);
        return res;
      }
      return {};
    }
    // return await response.json();
  }

  async getToken(reqObj?: { url: string; options: RequestInit }) {
    await this.fetchData({ path: "/token", method: "POST" });
    // await fetch(`${this.#apiDomain}/token`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   credentials: "include",
    // });
    if (reqObj) {
      fetch(reqObj.url, reqObj.options);
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
