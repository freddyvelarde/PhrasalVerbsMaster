import HttpService from "../services/HttpService";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ApiError from "../core/ApiError";

// Set up the mock adapter
const mock = new MockAdapter(axios);

describe("HttpService", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  let httpService = new HttpService(baseUrl);

  afterEach(() => {
    // Reset the mock adapter after each test
    mock.reset();
  });

  it("should return data on successful GET request", async () => {
    const mockData = { id: 1, name: "Test User" };
    // Ensure the mocked URL matches the request being made
    mock.onGet(`${baseUrl}/users`).reply(200, mockData);

    const result = await httpService.get<any>("/users");

    expect(result).toEqual(mockData);
  });

  it("should throw ApiError on failed GET request", async () => {
    // Mocking a 404 response for /users endpoint
    mock.onGet(`${baseUrl}/users`).reply(500, "Internal Server Error");

    try {
      await httpService.get<any>("/users");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).statusCode).toBe(500);
      expect((error as ApiError).message).toBe("Internal Server Error");
    }
  });

  it("should successfully post data and return the response", async () => {
    const mockData = { status: "ok", method: "POST" };
    const baseUrl = "https://dummyjson.com";
    httpService = new HttpService(baseUrl);
    mock.onPost(`${baseUrl}/test`).reply(200, mockData);

    const result = await httpService.post<any>(
      "/test",
      { key: "value" },
      { "Content-type": "application/json" },
    );

    expect(result).toEqual(mockData);
  });

  // it("should handle unexpected errors", async () => {
  //
  //   // Simulate a network error for the /users endpoint
  //   mock.onGet(`${baseUrl}/users`).networkError();
  //
  //   try {
  //     await httpService.get<any>("/users");
  //   } catch (error) {
  //     expect(error).not.toBeInstanceOf(ApiError);
  //     expect((error as Error).message).toBe("An unexpected error occurred");
  //   }
  // });
});
