# submit-argo-workflow-template

## Submit an Argo workflow template from GitHub 🗯️➡️🐙

## About

When triggered, this GitHub action submits an existing Argo workflow template.

## Usage

In your workflow, to use this github action add a step like this to your workflow:

## Inputs

| Name | Type | Description | Requried? | Default |
| --- | --- | --- | --- | --- |
| `` | String | A GitHub PAT is required, but the default is sufficient for public repos. For private repos, ensure you create a PAT that has discussion: write and repo: write, then store it as an action secret for usage within the workflow. See more details about tokens here - [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).  | **No** | `"${{ secrets.GITHUB_TOKEN }}"` | 
| `reaction_threshold` | Number  | Number of positive comment reactions required to mark as an answer. (Ex. `3`, `10`) Positive emoji reactions are: `["+1", "LAUGH", "HEART", "HOORAY", "ROCKET"]` | **No** | `0` |



: The endpoint where your Argo UI is hosted. This is used to build the link for dashboard of unique runs.