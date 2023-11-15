# Submit Argo Workflow Template GitHub Action 🗯️➡️🐙

#### A GitHub Action for Submitting Argo Workflow Templates

## About

When triggered, this GitHub action submits an existing Argo workflow template.

## Usage

To use this github action in your workflow, add a step like this:

```yaml
      - name: Run Submit Argo Workflow Template
        id: submitworkflow
        uses: konjoinfinity/submit-argo-workflow-template@v1.0.x
        with:
          ARGO_URL: "https://localhost:2746" # Local environment example, or use your deployed argo workflow server url.
          ARGO_TEMPLATE: "my-argo-workflow" # The name of your argo workflow template to submit.
          ARGO_NAMESPACE: "my-argo-namespace" # The argo namespace (kubernetes namespace).
          ARGO_TOKEN: "my-argo-token" 
          ARGO_ENTRYPOINT: "my-entrypoint"
          ARGO_PARAMETERS: ["param1=hello", "param2=123"]

```     

##### Example Output

```json
{
    "metadata": {
        "name": "hello-world-dzw9f",
        "generateName": "hello-world-",
        "namespace": "default",
        "uid": "23ce0a7e-3a48-47d0-9add-d81c451bbe9e",
        "resourceVersion": "125017",
        "generation": 1,
        "creationTimestamp": "2023-11-15T16:48:13Z",
        "labels": {
            "workflows.argoproj.io/creator": "system-serviceaccount-argo-argo-server",
            "workflows.argoproj.io/workflow-template": "hello-world"
        },
        "managedFields": [
            {
                "manager": "argo",
                "operation": "Update",
                "apiVersion": "argoproj.io/v1alpha1",
                "time": "2023-11-15T16:48:13Z",
                "fieldsType": "FieldsV1",
                "fieldsV1": {
                    "f:metadata": {
                        "f:generateName": {},
                        "f:labels": {
                            ".": {},
                            "f:workflows.argoproj.io/creator": {},
                            "f:workflows.argoproj.io/workflow-template": {}
                        }
                    },
                    "f:spec": {},
                    "f:status": {}
                }
            }
        ]
    },
    "spec": {
        "entrypoint": "whalesay",
        "arguments": {},
        "workflowTemplateRef": {
            "name": "hello-world"
        }
    },
    "status": {
        "startedAt": null,
        "finishedAt": null,
        "storedTemplates": {
            "namespaced/hello-world/whalesay": {
                "name": "whalesay",
                "inputs": {},
                "outputs": {},
                "metadata": {},
                "container": {
                    "name": "",
                    "image": "docker/whalesay:latest",
                    "command": [
                        "cowsay"
                    ],
                    "args": [
                        "hello world"
                    ],
                    "resources": {}
                }
            }
        }
    }
}
```

## Inputs ➡️

| Name | Type | Description | Requried? | Default |
| --- | --- | --- | --- | --- |
| `ARGO_URL` | String | The URL endpoint where your Argo Workflows instance is hosted. Example: `https://<your_url>.com/argo`. | **Yes** | N/A | 
| `ARGO_TEMPLATE` | String  | Argo workflow template name to be triggered. Syntax: `<name-of-argo-template>` (Example: `argo-workflow-template`) Ensure your workflow is already hosted on your argo workflows server, templates can be found under the templates tab in the Argo Workflows UI. | **Yes** | N/A |
| `ARGO_TOKEN` | String | The Argo Bearer Token which is passed in request authorization header. Example: `Authorization: Bearer Token v2:eyop...lrch` If your argo workflows server is configured with token authorization, a token is required to use this action. | **No** | N/A | 
| `ARGO_NAMESPACE` | String | The Argo namespace where your workflow template is hosted. Example: `<your-argo-namespace>` If your argo workflows server does not have a configured namespace the default is `argo`. | **No** | `argo` | 
| `ARGO_ENTRYPOINT` | String | The entrypoint for your Argo Workflow Template. Example: `<your_entrypoint>` | **No** | `default` |
| `ARGO_PARAMETERS` | Array[String] | An array of parameter strings to be passes to the Argo Workflows Template. Example: `["param1=hello", "param2=123"]` Syntax: `["<key>=<value>"]` | **No** | N/A |

## Request Body: JSON
```json
{                              
    "namespace": "<namespace-name>",
    "resourceKind": "WorkflowTemplate",
    "resourceName": "<workflow-template-name>",
    "submitOptions": {
        "entryPoint": "<workflow-entry-point>",
        "generateName": "<autogenerated-workflow-name>-",
        "parameters": ["param1=hello", "param2=123"]
    }
}
```

## All available input options and types

```json
{
  "namespace": "default",
  "resourceKind": "string",
  "resourceName": "string",
  "submitOptions": {
    "annotations": "string",
    "dryRun": true,
    "entryPoint": "string",
    "generateName": "string",
    "labels": "string",
    "name": "string",
    "ownerReference": {
      "apiVersion": "string",
      "blockOwnerDeletion": true,
      "controller": true,
      "kind": "string",
      "name": "string",
      "uid": "string"
    },
    "parameters": [
      "string"
    ],
    "podPriorityClassName": "string",
    "priority": 0,
    "serverDryRun": true,
    "serviceAccount": "string"
  }
}  
```

## Outputs ⬅️

| Name | Type | Description | Example |
| --- | --- | --- | --- |
| `ARGO_WORKFLOW_NAME` | String | The name of the generated argo workflow created by submitting the `ARGO_TEMPLATE`. | `hello-world-l4b5b` |
| `ARGO_NAMESPACE` | String | The configured namespace for argo workflows.  | `default` or `argo` |
| `ARGO_UID` | String | The unique identifier (`uid`) for the created workflow.  | `d147dfad-1c54-4025-bdd3-57a711dc890` |
| `ARGO_WORKFLOW_OUTPUTS` | Object | Outputs generated by an argo workflow.  | `{output1: "goodbye", output2: "456"}` |

## Example Output

```js
{
      metadata: {
        name: 'hello-world-xfphh',
        generateName: 'hello-world-',
        namespace: 'default',
        uid: '4ace9e2a-1d59-42ef-88ba-f8023d7510f0',
        resourceVersion: '133236',
        generation: 1,
        creationTimestamp: '2023-11-15T20:25:33Z',
        labels: {
          'workflows.argoproj.io/creator': 'system-serviceaccount-argo-argo-server',
          'workflows.argoproj.io/workflow-template': 'hello-world'
        },
        managedFields: [ [Object] ]
      },
      spec: {
        entrypoint: 'whalesay',
        arguments: { parameters: [Array] },
        workflowTemplateRef: { name: 'hello-world' }
      },
      status: {
        startedAt: null,
        finishedAt: null,
        storedTemplates: { 'namespaced/hello-world/whalesay': [Object] }
      }
    }
```

## Example Workflows

* An example [GitHub workflow](https://github.com/wesleyscholl/submit-argo-workflow-template/blob/main/.github/workflows/submit-argo-template.yml) can be found here.

* An example [Argo workflow](https://github.com/wesleyscholl/submit-argo-workflow-template/blob/main/.github/workflows/submit-argo-template.yml) can be found here.


## Credits

- [Create and Publish a GitHub Action in Typescript - Leonardo Montini](https://leonardomontini.dev/typescript-github-action)

### Inspired by:

- [peter-evans/create-or-update-comment](https://github.com/peter-evans/create-or-update-comment)
- [abirismyname/create-discussion](https://github.com/abirismyname/create-discussion)
- [machine-learning-apps/gke-argo](https://github.com/machine-learning-apps/gke-argo)
- [machine-learning-apps/actions-argo](https://github.com/machine-learning-apps/actions-argo)