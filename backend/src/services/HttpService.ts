import axios, { AxiosInstance } from "axios";
import ApiError from "../core/ApiError";

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        const message = error.response?.statusText || "Internal Server Error";
        // console.error(`Axios error: ${error.message}`);
        throw new ApiError(statusCode, message);
      } else {
        // console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
}

export default HttpService;
