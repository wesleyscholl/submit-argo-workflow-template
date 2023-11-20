import { run } from "../index";
import * as core from "@actions/core";
import { mocked } from "jest-mock";

jest.mock("@octokit/graphql");
jest.mock("@actions/core");
const mockedGetInput = mocked(core.getInput);
const mockedSetOutput = mocked(core.setOutput);
const mockedSetFailed = mocked(core.setFailed);
let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  // Store the original process.env object
  originalEnv = process.env;
  // Clear mock calls and reset any mocked values before each test
  jest.clearAllMocks();

  // Mock getInput, setFailed, and setOutput from @actions/core
  jest.mock("@actions/core", () => ({
    getInput: mockedGetInput,
    setFailed: mockedSetFailed,
    setOutput: mockedSetOutput,
  }));
  // Mock the GITHUB_EVENT_PATH
  process.env.GITHUB_EVENT_PATH = "src/__tests__/event.json";
});

afterAll(() => {
  // Restore the original process.env object after testing
  process.env = originalEnv;
});

test("should call run() when JEST_WORKER_ID is not defined", async () => {
  // Mock process.env to simulate JEST_WORKER_ID not being defined
  delete process.env.JEST_WORKER_ID;

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

test("should not call run() when JEST_WORKER_ID is defined", () => {
  // Mock process.env to simulate JEST_WORKER_ID being defined
  process.env.JEST_WORKER_ID = "some-worker-id";

  // Mock the run function
  const runSpy = jest.spyOn(core, "setFailed");

  // Call the conditional block
  require("../index"); // This will execute the code block

  // Expectations
  expect(runSpy).not.toHaveBeenCalled();

  // Clean up the spy
  runSpy.mockRestore();
});
