import axios from "axios";
import { appSettings } from "@/appSettings.js";

class NetworkResponse {
  constructor(statusCode = 0, data = null) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

class NetworkManager {
  static async apiRequest(url, data, contentType = "application/json", withToken = true) {
    const URL = `${appSettings.$api_url}/${url}`;
    let config = {
      headers: {
        Accept: "*/*",
      },
      timeout: appSettings.timeoutDuration,
    };
    if (withToken) {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }
    config.headers["Content-Type"] = contentType;

    try {
      const response = await axios.post(URL, data, config);
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      let resp = new NetworkResponse();
      if (error.response) {
        resp.statusCode = error.response.status;
        if (error.response.data) {
          resp.data = error.response.data;
        }
      } else {
        resp.statusCode = 502;
      }
      throw resp;
    }
  }
}

export default NetworkManager;
