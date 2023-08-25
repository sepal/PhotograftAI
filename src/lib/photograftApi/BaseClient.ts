export abstract class BaseClient {
  host: string | undefined;

  constructor(host: string | undefined = undefined) {
    this.host = host;
  }

  private prepUrl(endpoint: string, params?: URLSearchParams) {
    let url = this.host ? this.host + endpoint : endpoint;

    if (params && params.size > 0) {
      url += "?" + params.toString();
    }
    return url;
  }

  async get<T>(endpoint: string, params?: URLSearchParams): Promise<T> {
    const url = this.prepUrl(endpoint, params);
    const resp = await fetch(url, {
      method: "GET",
    });

    const data = (await resp.json()) as T;

    return data;
  }

  async post<T>(
    endpoint: string,
    body?: any,
    params?: URLSearchParams
  ): Promise<T> {
    const url = this.prepUrl(endpoint, params);

    if (body && body instanceof FormData) {
      body = body;
    } else {
      body = JSON.stringify(body);
    }

    const resp = await fetch(url, {
      method: "POST",
      body: body,
    });

    const data = (await resp.json()) as T;
    return data;
  }

  async put<T>(
    endpoint: string,
    body: any,
    params?: URLSearchParams
  ): Promise<T> {
    const url = this.prepUrl(endpoint, params);

    const resp = await fetch(url, {
      method: "put",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const data = (await resp.json()) as T;
    return data;
  }

  async delete<T>(endpoint: string, params?: URLSearchParams): Promise<T> {
    const url = this.prepUrl(endpoint, params);
    const resp = await fetch(url, {
      method: "DELETE",
    });

    const data = (await resp.json()) as T;

    return data;
  }
}
