import { getInput, setOutput } from "@actions/core";

export async function run() {
  const argoUrl = getInput("ARGO_URL");
  const argoTemplate = getInput("ARGO_TEMPLATE");
  const argoToken = getInput("ARGO_TOKEN");
  const argoNamespace = getInput("ARGO_NAMESPACE");
  const argoEntrypoint = getInput("ARGO_ENTRYPOINT");
  const argoParameters = getInput("ARGO_PARAMETERS");
  await setOutput("response", argoUrl, argoTemplate, argoToken, argoNamespace, argoEntrypoint, argoParameters);
}

run();
