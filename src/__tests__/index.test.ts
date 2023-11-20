import { run } from "../index";
import * as core from "@actions/core";
import { mocked } from "jest-mock";

// Mock the external dependencies
jest.mock("@actions/core");

const mockedGetInput = mocked(core.getInput);
const mockedSetOutput = mocked(core.setOutput);
const mockedSetFailed = mocked(core.setFailed);

beforeEach(async () => {
  // Clear mock calls and reset any mocked values before each test
  await jest.clearAllMocks();

  // Mock getInput, setFailed, and setOutput from @actions/core
  await jest.mock("@actions/core", () => ({
    getInput: mockedGetInput,
    setOutput: mockedSetOutput,
    setFailed: mockedSetFailed,
  }));
});

test("run submit argo workflow", async () => {
  // Mock the input values
  await mockedGetInput.mockReturnValueOnce("https://localhost:2746");
  await mockedGetInput.mockReturnValueOnce("hello-world");
  await mockedGetInput.mockReturnValueOnce("eyop...lrch");
  await mockedGetInput.mockReturnValueOnce("default");
  await mockedGetInput.mockReturnValueOnce('{"entryPoint": "whalesay", "parameters": ["param1=hello", "param2=123"]}');

  // Run the `run` function
  await run();

  // Assertions
  await expect(mockedGetInput).toHaveBeenCalledTimes(5);
  await expect(mockedSetOutput).toHaveBeenCalledTimes(6);
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoUrl", "https://localhost:2746");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoTemplate", "hello-world");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoToken", "eyop...lrch");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoNamespace", "default");
  await expect(mockedSetOutput).toHaveBeenCalledWith("argoOutputs", expect.any(Object));
});

test("run submit argo workflow with a missing or invalid namespace", async () => {
  const runSpy2 = jest.spyOn(core, "setFailed");
  await mockedGetInput.mockReturnValueOnce("https://localhost:3000");
  await mockedGetInput.mockReturnValueOnce("hello-world");
  await mockedGetInput.mockReturnValueOnce("eyop...lrch");
  await mockedGetInput.mockReturnValueOnce("default");
  await mockedGetInput.mockReturnValueOnce('{"entryPoint": "whalesay", "parameters": ["param1=hello", "param2=123"]}');

  await run();

  // Check if `run` was called
  await expect(runSpy2).toHaveBeenCalledTimes(1);

  // Check if `console.error` was called with an error message
  await expect(mockedSetFailed).toHaveBeenCalledWith("Http request error.");
  await runSpy2.mockRestore();
});

test("run submit argo workflow with a missing or invalid argoTemplate", async () => {
  const runSpy1 = jest.spyOn(core, "setFailed");
  await mockedGetInput.mockReturnValueOnce("https://localhost:2746");
  await mockedGetInput.mockReturnValueOnce("temp");
  await mockedGetInput.mockReturnValueOnce("eyop...lrch");
  await mockedGetInput.mockReturnValueOnce("default");
  await mockedGetInput.mockReturnValueOnce('{"entryPoint": "whalesay", "parameters": ["param1=hello", "param2=123"]}');

  await run();

  // Check if `run` was called
  await expect(runSpy1).toHaveBeenCalledTimes(1);

  // Check if `console.error` was called with an error message
  await expect(mockedSetFailed).toHaveBeenCalledWith("argoTemplate is missing or invalid.");
  await runSpy1.mockRestore();
});

test("run submit argo workflow with a missing or invalid url", async () => {
  const runSpy = jest.spyOn(core, "setFailed");
  await mockedGetInput.mockReturnValueOnce("https://localhos:2746");
  await mockedGetInput.mockReturnValueOnce("hello-world");
  await mockedGetInput.mockReturnValueOnce("eyop...lrch");
  await mockedGetInput.mockReturnValueOnce("default");
  await mockedGetInput.mockReturnValueOnce('{"entryPoint": "whalesay", "parameters": ["param1=hello", "param2=123"]}');

  await run();

  // Check if `run` was called
  await expect(runSpy).toHaveBeenCalledTimes(1);

  // Check if `console.error` was called with an error message
  await expect(mockedSetFailed).toHaveBeenCalledWith("argoUrl is missing or invalid.");
  await runSpy.mockRestore();
});
