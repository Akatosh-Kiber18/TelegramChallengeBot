import axios from "axios";
import { getTasks } from "../src/rest/tasks.rest";

jest.mock("axios");

describe.skip("getTasks", () => {
  it("should return the response data when successful", async () => {
    const responseData = [{ id: 1, name: "Task 1", cahtId: 1231521345 }, { id: 2, name: "Task 2", cahtId: 1231521345 }];
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getTasks()();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/tasks");
  });

  it("should reject with an error when there is an error", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    try {
      await getTasks()();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    }

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/tasks");
  });
});