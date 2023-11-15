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
  await mockedGetInput.mockReturnValueOnce("my-argo-workflow");
  await mockedGetInput.mockReturnValueOnce("my-argo-namespace");
  await mockedGetInput.mockReturnValueOnce("eyop...lrch");
  await mockedGetInput.mockReturnValueOnce("my-entrypoint");
  await mockedGetInput.mockReturnValueOnce('["param1=hello", "param2=123"]');

  // Run the `run` function
  await run();

  // Assertions
  await expect(mockedGetInput).toHaveBeenCalledTimes(6);
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoEntrypoint", "my-entrypoint");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoNamespace", "eyop...lrch");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoParameters", '["param1=hello", "param2=123"]');
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoTemplate", "my-argo-workflow");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoToken", "my-argo-namespace");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoUrl", "https://localhost:2746");
});
