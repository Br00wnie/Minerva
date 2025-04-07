# Architecture

## General

### Interaction Chain

![Architecture diagram](https://i.ibb.co/hx0nVYZZ/Minerva-Architecture-diagram.png)

User interaction with the application happens through _UI_. _UI_ does not handle logic; it delegates all logic to _ClientServices_.

_ClientServices_ update the UI accordingly. When a server request is needed, _ClientServices_ communicate with _ClientAPI_.

_ClientAPI_ forms requests and processes responses for _ClientServices_. It knows nothing about the UI, just as _ClientServices_ know nothing about requests and responses.

The request reaches _ServerAPI_, which handles incoming requests from _ClientAPI_ and constructs responses. It extracts data from requests and passes it to _ServerServices_.

_ServerServices_ perform all necessary logic with the provided data and interact with _DB_.

### Response Structure

- ClientApi -> { success, message, _data_, _total_ }
- ServerApi -> status, { message, _data_ }

> _Italicized_ components are optional parts of the response

### Entities

- User — users
- Document — documents
- Style — styles
- Favorite — favorite styles

### Authorization System

To authenticate, the user receives a JWT from the server, stored in a cookie. The token contains the user_id and expires after 24 hours. Clients automatically send the token in the cookies for authorization.

## Server

### ER Diagram

![ER diagram](https://i.ibb.co/fdGmjJgk/Minerva-ER-Diagram.png)

### Universal Endpoints

| Functionality | Path             | Query Params                 | Method |
| ------------- | ---------------- | ---------------------------- | ------ |
| Create entity | /entities/create | -                            | POST   |
| Get entity    | /entities/get    | entity_name\* OR entity_id\* | GET    |
| Update entity | /entities/update | entity_id\*                  | PUT    |
| Delete entity | /entities/delete | entity_id\*                  | DELETE |

> Verb-based naming is used for endpoints since the REST model proved to be inconvenient.

> No need to specify the user ID in the queries. All operations will be performed on the current user.

> The asterisk indicates mandatory parameters.

### Entity-Specific Endpoints

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

### Utils

- auth.js: getting user ID from token

### Environment variables

- DB_NAME ("minerva")
- DB_USER ("user")
- DB_PASSWORD ("1234")
- DB_HOST ("localhost")
- DB_PORT (5432)
- PORT (5000)
- HOST ("localhost")
- SECRET ("pony")

> Default values are shown in parentheses

## Client

### Local Storage Content

Used to store data between sessions

- document: { id, name, content }
- style: { id, name, content }

### Store Content

Manages the application's state

- UserStore: { isAuthenticated }
- ModalStore: { openModalId }
- DocumentStore: { name, content }
- StyleStore: { name, content }

> On app startup, the active document and style data are loaded from Local Storage if it’s not the first launch. In all other cases, this data comes from the corresponding Store. During the app’s operation, the data in Local Storage will be updated to remain current.

# Agreements

- Only atomic constants are named in UPPER_SNAKE_CASE
- Files that are entry points (both on the server and the client) are named "index"
- Client can get _user_id_ only in hashed form

# Dev Setup Example

## Host & Guest

| **Host (Main PC)**                                                                                | **Guest (Virtual Machine)**                                       |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **OS:** Windows 11 <br> **Tools:** VirtualBox, Visual Studio Code with the Remote - SSH extension | **OS:** Ubuntu 22, running in VirtualBox with NAT networking mode |

## Ports Mapping

| Service           | Host (Windows) | Guest (Ubuntu) | Docker Container |
| ----------------- | -------------- | -------------- | ---------------- |
| Frontend (Client) | 80             | 5173           | –                |
| Backend (Server)  | 5000           | 5000           | –                |
| Remote SSH        | 2222           | 22             | –                |
| pgAdmin4          | 8080           | 8080           | 80               |

> Since I didn’t want to install pgAdmin4 on the host machine, the decision was made to use its browser version. The classic method of installing pgAdmin4 didn’t work on Ubuntu, so I had to turn to Docker. The setup is like this: first, VirtualBox NAT forwards port 8080 from the guest machine, and then the Docker container forwards its own port 80. As a result, pgAdmin4 becomes available at http://localhost:8080 on the host.

## Versions

- **VirtualBox:** 7.1.2
- **Docker:** 24.0.7
- **PostgreSQL:** 17.2
