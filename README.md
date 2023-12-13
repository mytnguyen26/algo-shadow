# algo-shadow

<img src="https://github.com/mytnguyen26/algo-shadow/actions/workflows/node.js.yml/badge.svg"/>

Algo-shadow is an algorithm visualizer web application. With this application users can do the following:
+ Select an algorithm from our list of algorithms to visualize. Then the user can instantiate the data structure and initial state of the algorithm selected by providing inputs. As users step thru each step, the graph represents the state of the data structure of the algorithm changes
+ Run multiple experiments with the algorithms, then save their results to a database for analysis later

## Getting started
Our project contains a front-end application and a server application. The project structure is as follow

- `utils` should have all JavaScripts files
- `pages` should have our React Components
- `assets` should have our CSS Styles
- `contants` should have our routes definitions

```
├── .github
│   ├── workflows
├── documents
├── packages
│   ├── clients
│   │   ├── tests
│   │   ├── src
│   │   │   ├── assets
│   │   │   ├── constants
│   │   │   ├── context
│   │   │   ├── images
│   │   │   ├── pages
│   │   │   ├── utils
│   │   │   ├── App.jsx
│   │   │   ├── Main.jsx
│   │   ├── coverage
│   │   ├── package-lock.json
│   │   ├── package.json
├── dist (or build
└── .gitignore
```

Source code and artifacts related to the front-end would go in `./packages/clients`.  
Github Action CI/CD configurations could be found in `./.github/workflows`

## Developer install

#### 1. Clone this repository


#### 2. To start client-side app
(Assuming we have npm installed)

Change directory to client-side app

```bash
cd packages/client
```

Install all dependencies

```bash
npm i
```

Start the local host

```bash
npm run dev
```

The client will start at local host

## Running Authentication Service
Authentication service provides user authentication for Login/Logout. The user is required to obtain a valid login to be redirected to the `algorithm/` page

First, clone https://github.com/hicsail/authentication-service

### 1. Front-End
Change directory to where authentication-service is cloned to.

```bash
cd <PATH TO FOLDER>/authentication-service
```

1. create .env file in the client directory
2. add the following to the .env file
```
# your backend url
VITE_AUTH_SERVICE=http://localhost:3001/graphql

# your google client id 
VITE_GOOGLE_CLIENT_ID=
```
3. install dependencies by running `npm install` in the client directory
3. run `npm run dev` in the client directory

### 2. Back-End
1. install PostgresSQL in your local machine
2. create .env file in the server directory
3. add the following to the .env file
```
# your local database url
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres

# JWT experation time
JWT_EXPIRATION="18h"

# JWT Refresh Token experation time
REFRESH_EXPIRATION="48h"

PRIVATE_KEY=""
PUBLIC_KEY=""
PUBLIC_KEY_1=""
```
4. run `npm install` in the server directory
5. run `npm run prisma:generate` to initialize the database
6. run `npm run prisma:migrate` to migrate the database
7. run `npm run dev` to start the server
8. go to `http://localhost:3001/graphql` to access the graphql playground 
9. add your first project by running the following mutation
```
mutation {
  createProject(
    project: {
      name: "test",
      description: "test",
      displayProjectName: true,
      allowSignup: true,
      googleAuth: true,
      emailAuth: true
    }
  ) {
    id,
    name
  }
}
```

## Contribution
Everyone is welcomed to contribute to this project. To start contribution, either Create an Issue, or Create a Pull Request. All new enhancements should be cloned from `dev`, and PR to `dev` before release. As features, enhancements, and bug fixes are ready for release, 
