// Vanilla JS replacement for src/api/axios.js
// Same baseURL, same JWT interceptor behavior, same "token" localStorage key.
// Mirrors axios response shape ({ data, status }) and axios error shape
// ({ response: { status, data, headers } }) so existing page logic
// (which reads response.data / error.response?.data) needs no changes.

const BASE_URL = "http://localhost:8080/api";

async function request(method, url, body) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = { method, headers };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(BASE_URL + url, config);
  } catch (networkError) {
    const error = new Error("Network Error");
    error.response = undefined;
    throw error;
  }

  const text = await res.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
  }

  if (!res.ok) {
    const error = new Error(`Request failed with status ${res.status}`);
    error.response = {
      status: res.status,
      data,
      headers: res.headers,
    };
    throw error;
  }

  return { data, status: res.status, headers: res.headers };
}

const api = {
  get: (url) => request("GET", url),
  post: (url, body) => request("POST", url, body),
  put: (url, body) => request("PUT", url, body),
  delete: (url) => request("DELETE", url),
};

export default api;
