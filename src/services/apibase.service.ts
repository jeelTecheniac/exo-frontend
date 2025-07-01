import axios, { AxiosInstance } from "axios";
import localStorageService from "./local.service";

class ApiBaseService {
  guestRequest: AxiosInstance;
  authorizedRequest: AxiosInstance;

  constructor() {
    // for guest api call
    this.guestRequest = axios.create({
      baseURL: "https://exotrack.makuta.cash/api/V1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.guestRequest.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // for authenticated api call
    this.authorizedRequest = axios.create({
      baseURL: "https://exotrack.makuta.cash/api/V1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.authorizedRequest.interceptors.request.use(
      (config) => {
        const accessToken = localStorageService.getAccessToken();

        if (accessToken) {
          // Configure this as per your backend requirements
          config.headers['VAuthorization'] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export default ApiBaseService;
