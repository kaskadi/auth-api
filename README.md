![](https://img.shields.io/github/package-json/v/kaskadi/auth-api)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/auth-api?color=blue)

**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/auth-api/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/auth-api/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/auth-api/build?label=build&logo=mocha)](https://github.com/kaskadi/auth-api/actions?query=workflow%3Abuild)
[![](https://img.shields.io/github/workflow/status/kaskadi/auth-api/syntax-check?label=syntax-check&logo=serverless)](https://github.com/kaskadi/auth-api/actions?query=workflow%3Asyntax-check)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/auth-api?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/auth-api)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/auth-api?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/auth-api)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/auth-api?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/auth-api)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/auth-api?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/auth-api/?mode=list&logo=LGTM)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# API endpoints

The origin and root path for this API is: `https://api.klimapartner.net/auth`

The following endpoints are defined in this API:
- [/get-signed-url](#/get-signed-url)
- [/login](#/login)
- [/logout](#/logout)
- [/refresh](#/refresh)

## `/get-signed-url` <a name="/get-signed-url"></a>

Supported methods:
- [GET](#get-signed-url-GET)

### `GET` (target lambda → [create-cfd-signed-url](#create-cfd-signed-url)) <a name="get-signed-url-GET"></a>

**Description:**

This endpoint returns a CloudFront signed URL that can be used for accessing content from a private CDN.

**Authorization:**

|   Type  | Identity source                                       |
| :-----: | :---------------------------------------------------- |
| Cognito | <ul><li>method.request.header.Authorization</li></ul> |

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

No body found for this method.

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
GET https://api.klimapartner.net/auth/get-signed-url

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "signedUrl": "some_signed_url"
  }
```
</details>

## `/login` <a name="/login"></a>

Supported methods:
- [POST](#login-POST)

### `POST` (target lambda → [login](#login)) <a name="login-POST"></a>

**Description:**

This endpoint allows user to retrieve their authentication data given they provided a proper username and password. **This currently does not support Google as an authentication provider.**

**Authorization:**

No authorizer found for this method.

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

|     Key    |  Default  | Description                                                                     |
| :--------: | :-------: | :------------------------------------------------------------------------------ |
|  `method`  | `Cognito` | Defines the authentication provider. Valid values: `'Cognito'`, `'Google'`      |
|   `token`  |           | Access token to login. This is used only when logging in via **Google**.        |
| `Username` |           | Username used for logging in via **AWS Cognito**.                               |
| `Password` |           | Password associated with the given username for logging in via **AWS Cognito**. |

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
POST https://api.klimapartner.net/auth/login

Body:
  {
    "Username": "cognito_username",
    "Password": "secret_cognito_pwd"
  }
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "accessToken": "cognito_access_token",
    "idToken": "cognito_id_token",
    "refreshToken": "cognito_refresh_token",
    "email": "user_email",
    "emailHash": "user_email_md5_hash"
  }
```
</details>

<details>
<summary>Example #2</summary>

_Request:_

```HTTP
POST https://api.klimapartner.net/auth/login

Body:
  {
    "Username": "wrong_cognito_username",
    "Password": "wrong_secret_cognito_pwd"
  }
```

_Response:_

```HTTP
Status code:
  401

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "Provided credentials are incorrect."
  }
```
</details>

## `/logout` <a name="/logout"></a>

Supported methods:
- [POST](#logout-POST)

### `POST` (target lambda → [logout](#logout)) <a name="logout-POST"></a>

**Description:**

This endpoint allows user to invalidate any authentication tokens generated with their credentials. **This currently does not support Google as an authentication provider.**

**Authorization:**

No authorizer found for this method.

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

|      Key      |  Default  | Description                                                                                  |
| :-----------: | :-------: | :------------------------------------------------------------------------------------------- |
|    `method`   | `Cognito` | Defines the authentication provider. Valid values: `'Cognito'`, `'Google'`                   |
| `accessToken` |           | Access token provided when logging in. This applies only to session created via **Cognito**. |

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
POST https://api.klimapartner.net/auth/logout

Body:
  {
    "accessToken": "cognito_access_token"
  }
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "User successfully logged out!"
  }
```
</details>

<details>
<summary>Example #2</summary>

_Request:_

```HTTP
POST https://api.klimapartner.net/auth/logout

Body:
  {
    "accessToken": "wrong_cognito_access_token"
  }
```

_Response:_

```HTTP
Status code:
  401

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "Provided access token is incorrect."
  }
```
</details>

## `/refresh` <a name="/refresh"></a>

Supported methods:
- [POST](#refresh-POST)

### `POST` (target lambda → [refresh-session](#refresh-session)) <a name="refresh-POST"></a>

**Description:**

This endpoint allows user to refresh their access token in order to avoid having to log in again. This will work until their refresh token expires. **This currently does not support Google as an authentication provider.**

**Authorization:**

No authorizer found for this method.

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

|       Key      |  Default  | Description                                                                                   |
| :------------: | :-------: | :-------------------------------------------------------------------------------------------- |
|    `method`    | `Cognito` | Defines the authentication provider. Valid values: `'Cognito'`, `'Google'`                    |
| `refreshToken` |           | Refresh token provided when logging in. This applies only to session created via **Cognito**. |

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
POST https://api.klimapartner.net/auth/refresh

Body:
  {
    "refreshToken": "cognito_refresh_token"
  }
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "accessToken": "cognito_access_token",
    "idToken": "cognito_id_token"
  }
```
</details>

<details>
<summary>Example #2</summary>

_Request:_

```HTTP
POST https://api.klimapartner.net/auth/refresh

Body:
  {
    "refreshToken": "wrong_cognito_refresh_token"
  }
```

_Response:_

```HTTP
Status code:
  401

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "Provided refresh token is incorrect."
  }
```
</details>

# API resources

The following lambda functions are used in this API:
- [login](#login)
- [refresh-session](#refresh-session)
- [logout](#logout)
- [create-cfd-signed-url](#create-cfd-signed-url)

The following layers are used in this API:
- [auth-api-layer](#auth-api-layer)

## login <a name="login"></a>

|  Name | Sources                | Timeout |               Handler               | Layers                                              |
| :---: | :--------------------- | :-----: | :---------------------------------: | :-------------------------------------------------- |
| login | <ul><li>HTTP</li></ul> |   30s   | [handler](./lambdas/login/login.js) | <ul><li>[auth-api-layer](#auth-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## refresh-session <a name="refresh-session"></a>

|       Name      | Sources                | Timeout |                         Handler                         | Layers                                              |
| :-------------: | :--------------------- | :-----: | :-----------------------------------------------------: | :-------------------------------------------------- |
| refresh-session | <ul><li>HTTP</li></ul> |   30s   | [handler](./lambdas/refresh-session/refresh-session.js) | <ul><li>[auth-api-layer](#auth-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## logout <a name="logout"></a>

|  Name  | Sources                | Timeout |                Handler                | Layers                                              |
| :----: | :--------------------- | :-----: | :-----------------------------------: | :-------------------------------------------------- |
| logout | <ul><li>HTTP</li></ul> |   30s   | [handler](./lambdas/logout/logout.js) | <ul><li>[auth-api-layer](#auth-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## create-cfd-signed-url <a name="create-cfd-signed-url"></a>

|          Name         | Sources                | Timeout |                               Handler                               | Layers                                              |
| :-------------------: | :--------------------- | :-----: | :-----------------------------------------------------------------: | :-------------------------------------------------- |
| create-cfd-signed-url | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/create-cfd-signed-url/create-cfd-signed-url.js) | <ul><li>[auth-api-layer](#auth-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## auth-api-layer <a name="auth-api-layer"></a>

### Description

Layer for auth-api

### Dependencies

- `aws-sdk`, version: `2.771.0` ([see on NPM](https://www.npmjs.com/package/aws-sdk))
- `auth-api-utils` (local utility)

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value    |
| :----------- | :------- |
| app          | kaskadi  |
| service      | auth-api |
| logical-unit | auth     |
| type         | http     |
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->
