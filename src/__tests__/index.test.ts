import { run } from "../index";
import * as core from "@actions/core";
import { mocked } from "jest-mock";

// Mock the external dependencies
jest.mock("@actions/core");

const mockedGetInput = mocked(core.getInput);
const mockedSetOutput = mocked(core.setOutput);

beforeEach(() => {
  // Clear mock calls and reset any mocked values before each test
  jest.clearAllMocks();

  // Mock getInput, setFailed, and setOutput from @actions/core
  jest.mock("@actions/core", () => ({
    getInput: mockedGetInput,
    setOutput: mockedSetOutput,
  }));
});

test("run submit argo workflow", async () => {
  // Mock the input values
  await mockedGetInput.mockReturnValueOnce("https://localhost:2746");
  await mockedGetInput.mockReturnValueOnce("hello-world");
  await mockedGetInput.mockReturnValueOnce("eyop...lrch");
  await mockedGetInput.mockReturnValueOnce("default");
  await mockedGetInput.mockReturnValueOnce("whalesay");
  await mockedGetInput.mockReturnValueOnce("param1=hello");
  await mockedGetInput.mockReturnValueOnce("param2=123");

  // Run the `run` function
  await run();

  // Assertions
  await expect(mockedGetInput).toHaveBeenCalledTimes(7);
  await expect(mockedSetOutput).toHaveBeenCalledTimes(8);
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoUrl", "https://localhost:2746");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoTemplate", "hello-world");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoToken", "eyop...lrch");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoNamespace", "default");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoEntrypoint", "whalesay");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoParameter1", "param1=hello");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoParameter2", "param2=123");
});
