import { getInput, setOutput } from "@actions/core";

export async function run() {
  const argoUrl = await getInput("ARGO_URL");
  const argoTemplate = await getInput("ARGO_TEMPLATE");
  const argoToken = await getInput("ARGO_TOKEN");
  const argoNamespace = await getInput("ARGO_NAMESPACE");
  const argoEntrypoint = await getInput("ARGO_ENTRYPOINT");
  const argoParameters = await getInput("ARGO_PARAMETERS");
  await setOutput("argoUrl", argoUrl);
  await setOutput("argoTemplate", argoTemplate);
  await setOutput("argoToken", argoToken);
  await setOutput("argoNamespace", argoNamespace);
  await setOutput("argoEntrypoint", argoEntrypoint);
  await setOutput("argoParameters", argoParameters);
}

run();
