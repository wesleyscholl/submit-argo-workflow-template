import { getInput, setOutput } from "@actions/core";
import axios from "axios";
import https from "https";

export async function run() {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const argoUrl = await getInput("ARGO_URL");
  const argoTemplate = await getInput("ARGO_TEMPLATE");
  const argoToken = await getInput("ARGO_TOKEN");
  const argoNamespace = await getInput("ARGO_NAMESPACE");
  const argoEntrypoint = await getInput("ARGO_ENTRYPOINT");
  const argoParameter1 = await getInput("ARGO_PARAMETER1");
  const argoParameter2 = await getInput("ARGO_PARAMETER2");

  await axios
    .post(
      `${argoUrl}/api/v1/workflows/default/submit`,
      {
        namespace: argoNamespace,
        resourceKind: "WorkflowTemplate",
        resourceName: argoTemplate,
        // submitOptions should be the parameter to include entryPoint and parameters - type object
        submitOptions: {
          entryPoint: argoEntrypoint,
          parameters: [argoParameter1, argoParameter2],
        },
      },
      { httpsAgent }
    )
    .then(function (response) {
      console.log(response.data);
      setOutput("argoOutputs", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

// Conditional to check for localhost/127 or domain url.
// Consider renaming argoTemplate to argoTemplateName.
// Conditional to check for argoToken and include in headers if present.
// Handling for invalid urls and tokens
// argoNamespace shoulf default to argo, if not use argoNamespace.
// Conditional to check for argoEntrypoint, replace if present, default is default.
// Come up with a way to check for, parse, and concatinate params into an array of strings.
// Consider using one argoParam, make it an array of strings no matter the number of params.
// Add http check for local env, use unauthorized urls if local, if not don't use.
// Check other submission options for workflow templates.

  await setOutput("argoUrl", argoUrl);
  await setOutput("argoTemplate", argoTemplate);
  await setOutput("argoToken", argoToken);
  await setOutput("argoNamespace", argoNamespace);
  await setOutput("argoEntrypoint", argoEntrypoint);
  await setOutput("argoParameter1", argoParameter1);
  await setOutput("argoParameter2", argoParameter2);
}

if (!process.env.JEST_WORKER_ID) {
  run();
}
