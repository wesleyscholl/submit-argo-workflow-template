# submit-argo-workflow-template

## Submit an Argo workflow template from GitHub 🗯️➡️🐙

## About

When triggered, this GitHub action submits an existing Argo workflow template.

## Usage

To use this github action in your workflow, add a step like this:

## Inputs

| Name | Type | Description | Requried? | Default |
| --- | --- | --- | --- | --- |
| `ARGO_URL` | String | The URL endpoint where your Argo Workflows instance is hosted. Example: `https://<your_url>.com/argo`. | **Yes** | N/A | 
| `reaction_NAME` | Number  | Number of positive comment reactions required to mark as an answer. (Ex. `3`, `10`) Positive emoji reactions are: `["+1", "LAUGH", "HEART", "HOORAY", "ROCKET"]` | **No** | `0` |



