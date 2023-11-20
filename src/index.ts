import { getInput, setOutput, setFailed } from "@actions/core";
import axios from "axios";
import https from "https";

export async function run() {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const argoUrl = await getInput("ARGO_URL");
  if (!argoUrl.includes("localhost")) {
    await setFailed("argoUrl is missing or invalid.");
    return;
  }

  const argoTemplate = await getInput("ARGO_TEMPLATE");
  if (!(argoTemplate.length >= 5)) {
    await setFailed("argoTemplate is missing or invalid.");
    return;
  }

  const argoToken = await getInput("ARGO_TOKEN");
  const argoNamespace = await getInput("ARGO_NAMESPACE");
  const argoSubmitOptions = await JSON.parse(getInput("ARGO_SUBMIT_OPTIONS"));

  await axios
    .post(
      `${argoUrl}/api/v1/workflows/default/submit`,
      {
        namespace: argoNamespace,
        resourceKind: "WorkflowTemplate",
        resourceName: argoTemplate,
        submitOptions: argoSubmitOptions,
      },
      { httpsAgent }
    )
    .then(function (response) {
      console.log(response.data);
      setOutput("argoOutputs", response.data);
    })
    .catch(async function (error) {
      console.log(error);
      await setFailed("Http request error.");
    });

  // Conditional to check for localhost/127 or domain url.
  // Consider renaming argoTemplate to argoTemplateName.
  // Conditional to check for argoToken and include in headers if present.
  // Handling for invalid urls and tokens
  // argoNamespace shoulf default to argo, if not use argoNamespace.
  // Conditional to check for argoEntrypoint, replace if present, default is default.
  // Come up with a way to check for, parse, and concatinate params into an array of strings.

  // Add http check for local env, use unauthorized urls if local, if not don't use.
  // Check other submission options for workflow templates.

  await setOutput("argoUrl", argoUrl);
  await setOutput("argoTemplate", argoTemplate);
  await setOutput("argoToken", argoToken);
  await setOutput("argoNamespace", argoNamespace);
  await setOutput("argoSubmitOptions", argoSubmitOptions);
}

if (!process.env.JEST_WORKER_ID) {
  run();
}
