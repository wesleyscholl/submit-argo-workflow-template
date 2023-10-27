# Submit Argo Workflow Template

## Submit an Argo workflow template from GitHub 🗯️➡️🐙

## About

When triggered, this GitHub action submits an existing Argo workflow template.

## Usage

To use this github action in your workflow, add a step like this:

## Inputs

| Name | Type | Description | Requried? | Default |
| --- | --- | --- | --- | --- |
| `ARGO_URL` | String | The URL endpoint where your Argo Workflows instance is hosted. Example: `https://<your_url>.com/argo`. | **Yes** | N/A | 
| `ARGO_TEMPLATE` | String  | Number of positive comment reactions required to mark as an answer. Syntax: `<name-of-argo-template>` (Example: `argo-workflow-template`) | **Yes** | N/A |


https://<your-url>.com/argo/api/v1/workflows/<your-namespace>/submit



