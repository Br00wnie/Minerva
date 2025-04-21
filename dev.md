# Content

- [General](#general)
  - [Interaction Chain](#interaction-chain)
  - [Response Structure](#response-structure)
  - [Entities](#entities)
  - [Authorization System](#authorization-system)
- [Server](#server)
  - [ER Diagram](#er-diagram)
  - [Universal Endpoints](#universal-endpoints)
  - [Entity-Specific Endpoints](#entity-specific-endpoints)
  - [Middleware](#middleware)
  - [Utils](#utils-server)
  - [Environment variables](#environment-variables)
- [Client](#client)
  - [Client-Side Storage](#client-side-storage)
  - [Utils](#utils-client)
  - [Style Library](#style-library)
- [Agreements](#agreements)

# General

## Interaction Chain

![Architecture diagram](https://i.ibb.co/tw1FNc2q/Minerva-Architecture-Diagram.png)

User interaction with the application happens through _UI_. _UI_ does not handle logic; it delegates all logic to _ClientServices_.

_ClientServices_ update the UI accordingly. When a server request is needed, _ClientServices_ communicate with _ClientAPI_.

_ClientAPI_ forms requests and processes responses for _ClientServices_. It knows nothing about the UI, just as _ClientServices_ know nothing about requests and responses.

The request reaches _ServerAPI_, which handles incoming requests from _ClientAPI_ and constructs responses. It extracts data from requests and passes it to _ServerServices_.

_ServerServices_ perform all necessary logic with the provided data and interact with _DB_.

## Response Structure

- ClientApi -> { success, message, _data_}
- ServerApi -> status, { message, _data_ }

> _Italicized_ components are optional parts of the response

## Entities

- User — users
- Document — documents
- Style — styles
- Favorite — favorite styles

## Authorization System

To authenticate, the user receives a JWT from the server, stored in a cookie. The token contains the user_id and expires after 24 hours. Clients automatically send the token in the cookies for authorization.

# Server

## ER Diagram

![ER diagram](https://i.ibb.co/fdGmjJgk/Minerva-ER-Diagram.png)

## Universal Endpoints

| Functionality | Path             | Query Params                 | Method |
| ------------- | ---------------- | ---------------------------- | ------ |
| Create entity | /entities/create | -                            | POST   |
| Get entity    | /entities/get    | entity_name\* OR entity_id\* | GET    |
| Update entity | /entities/update | entity_id\*                  | PUT    |
| Delete entity | /entities/delete | entity_id\*                  | DELETE |

> Verb-based naming is used for endpoints since the REST model proved to be inconvenient.

> No need to specify the user ID in the queries. All operations will be performed on the current user.

> The asterisk indicates mandatory parameters.

## Entity-Specific Endpoints

| Functionality           | Path           | Query Params                  | Method | Scope           |
| ----------------------- | -------------- | ----------------------------- | ------ | --------------- |
| Login (get user token)  | /users/login   | -                             | POST   | User            |
| Get list of user styles | /entities/list | page\*, limit\*               | GET    | Document, Style |
| Search public styles    | /styles/search | style_name\*, page\*, limit\* | GET    | Style           |
| Copy public style       | /styles/copy   | style_id\*                    | POST   | Style           |

> The asterisk indicates mandatory parameters.

## Middleware

| Name                    | Description                                                             | Type  |
| ----------------------- | ----------------------------------------------------------------------- | ----- |
| AuthChecking            | Checks for valid token in cookies                                       | Front |
| AccessChecking          | Ensures user has access to the requested entity                         | Front |
| PresenceChecking        | Checks for the presence of the searched entity in the DB                | Front |
| BodyParamChecking       | Verifies that required parameters exist in body                         | Front |
| QueryParamChecking      | Verifies that required parameters exist in query                        | Front |
| SomeQueryParamChecking  | Verifies that at least one of the specified query parameters is present | Front |
| LoginValidation         | Performs login validation specified in the body                         | Front |
| PasswordValidation      | Performs password validation specified in the body                      | Front |
| NameValidation          | Performs entity name validation specified in the body                   | Front |
| UnexpectedErrorHandling | Handles unexpected errors                                               | Back  |

## Utils {#server}

- auth.js: Getting user ID from token

## Environment variables

- DB_NAME ("minerva")
- DB_USER ("user")
- DB_PASSWORD ("1234")
- DB_HOST ("localhost")
- DB_PORT (5432)
- PORT (5000)
- HOST ("localhost")
- SECRET ("pony")

> Default values are shown in parentheses

# Client

## Client-Side Storage

### Stores (State Management)

Manages the application's state

- UserStore
  - login
- ModalStore
  - openModalId
- DocumentStore
  - id
  - name
  - content
- StyleStore
  - id
  - name
  - description
  - content
  - isPublic
  - popularity

### Local Storage (Persistent Data)

Used to store data between sessions

- minerva_userLogin
- minerva_documentId
- minerva_documentName
- minerva_documentContent
- minerva_styleId
- minerva_styleName
- minerva_styleDescription
- minerva_styleContent
- minerva_styleIsPublic
- minerva_stylePopularity

On app startup, the active document and style data are loaded from Local Storage. If the storage is empty, this data is retrieved from the default template. During app operation, Local Storage is continuously updated to maintain data consistency.

### Cookie (Authentication System)

Cookies are used for authorization and store only a token containing the user_id.

## Utils {#client}

- storageManagement.js: Wrapper for easy Storage interaction
- toast.js: User notification system
- fileExport.js: Exports data as JSON
- fileImport.js: JSON import
- store.jsx: State manager
  - helpers.js
- tokenChecking.js: Token presence/validity checks
- validation.js: Name, login & password validations

## Style Library

### MyButton

**Params worth noting:** label:string

**Children:** -

**Structure:**

```jsx
<button>{label}</button>
```

**Usage example:**

```jsx
<MyButton
  label="Delete"
  onClick={() => DocumentService.delete({ documentId })}
  className="danger"
/>
```

### MyDropdown

**Params worth noting:** label:string

**Children:** MyDropdown, hr

**Structure:**

```jsx
<container>
  <label>{label}</label>
  <select>{children}</select>
</container>
```

**Usage example:**

```jsx
<MyDropdown label="User">
  <MyDropdown
    label="Login"
    onClick={() => modalServices.openModal(LOGIN_MODAL_ID)}
  />
  <MyDropdown
    label="Register"
    onClick={() => modalServices.openModal(REGISTRATION_MODAL_ID)}
  />
</MyDropdown>
```

### MyInput

**Params worth noting:** label:string, description:string, options:array, short:bool

**Children:** -

**Structure:**

```jsx
<container>
  <info>
    <label>{label}</label>
    <description>{description}</description>
  </info>
  <input />
</container>
```

**Usage example:**

```jsx

```

# Agreements

- Only atomic constants are named in UPPER_SNAKE_CASE
- Files that are entry points (both on the server and the client) are named "index"
- Client can get _user_id_ only in hashed form
- Atomic UI components can be assigned no more than one class
