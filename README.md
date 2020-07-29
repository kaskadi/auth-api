**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-api/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/template-kaskadi-api/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-api/build?label=build&logo=mocha)](https://github.com/kaskadi/template-kaskadi-api/actions?query=workflow%3Abuild)
<!-- Only for branches which are not release/** or master -->
<!-- ![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-api/syntax-test?label=syntax-test&logo=serverless) -->

:point_right: **Badges here** :point_left:

****

# :warning: Known issues :warning:

## New element initialization

When creating a new repository based off of this template, a _GitHub Actions_ called `init` should normally run and rename all references of the template name in files to the name of your repository.

It is known that this action sometimes does not run (see [here](https://github.com/kaskadi/template-kaskadi-element/issues/17)).

**Suspected cause:** it seems that `init` is not running in cases where the user would try to manipulate the repository directly after creation. **To minimize risks of bug, please wait a minute or two after your repository creation to make sure that `init` runs.**

**Please report any cases where this happens and detail the steps that led to it.**

**If this happens to you:**
1. `npm i -g kaskadi-cli` (if not installed)
2. `kaskadi init api`

****

❌ **This section can be deleted when done with all the preliminary work** ❌

# :computer: Creating a new API from this template :computer:

**Checklist (delete items when done)**
- create a new repository and choose this repository as template
- clone the new repository to a local working copy
- install all dependencies via `npm i`
- configure your API in its `serverless.yml` ([here](./serverless.yml)) config file for deployment
- when you feel like your API is ready for deployment, go [here](./.github/workflows/deploy.yml) and change the `command` field with `--version` value to `deploy -v`

**Attention:** if you wish to use kaskadi's CLI tools, make sure to have `kaskadi-cli` installed globally (`npm i -g kaskadi-cli`)

****

# Add new endpoints

In order to add new endpoints:
1. Go to the root of your API repository
2. Run `npm run add-lambda <lambda_name> <http_method> <path/to/your/lambda>`
3. You can start working on your endpoint inside of `lambdas/<lambda_name>` that should be created once the command has ran

# Upgrade API version

To update your API version, run `npm run upgrade-version <version_option>`. This takes the same argument as `npm version` (see [here](https://docs.npmjs.com/cli/version)). It will update for you the main `package.json` as well as `serverless.json` but also all `package.json` for all endpoints.

# Using custom domain for your API

_For all custom domains you will need a certificate for this domain. Please make sure that you have the proper certificate generated, else create one associated with your domain. All this can be done [here](https://console.aws.amazon.com/acm/home?region=us-east-1#/)_

**Case 1: creating a new custom domain for API**

If the custom domain you wish to use hasn't been created yet (list of custom domains [here](https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/custom-domain-names)).

1. Go [here](https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/custom-domain-names) and click on _Create Custom Domain Name_
2. Configure your domain as you wish to
3. Once the domain is created and initialized, go to [Route 53](https://console.aws.amazon.com/route53/home?region=eu-central-1)
4. Go into the _Hosted Zone_ for the domain you wish to use and create a new _A Record_.
5. For this record, you should toggle the _Alias_ option, give for _name_ the custom domain name you wish to use and select for _Alias target_ the API you want to map to this domain. You may need to copy paste the base URL to that API to make this work

**Case 2: using an existing custom domain**

1. Go [here](https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/custom-domain-names)
2. Click on _Edit_ for the custom domain you wish to use
3. Add a base path you wish to map your API to for this domain and then select the API & its stage in the dropdown menus

**Attention:** you can only use an existing custom domain if this domain doesn't have already an empty path as base path.

:point_down: **Your documentation here** :point_down:
