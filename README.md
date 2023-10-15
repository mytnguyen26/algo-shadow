# algo-shadow

<img src="https://github.com/mytnguyen26/algo-shadow/actions/workflows/node.js.yml/badge.svg"/>

Algo-shadow is an algorithm visualizer web application. With this application users can do the following:
+ Select an algorithm from our list of algorithms to visualize. Then the user can instantiate the data structure and initial state of the algorithm selected by providing inputs. As users step thru each step, the graph represents the state of the data structure of the algorithm changes
+ Run multiple experiments with the algorithms, then save their results to a database for analysis later

## Getting started
Our project contains a front-end application and a server application. The project structure is as follow

```
├── .github
│   ├── workflows
├── documents
├── packages
│   ├── clients
│   │   ├── __tests__
│   │   ├── src
│   │   ├── package-lock.json
│   │   ├── package.json
│   ├── server
│   │   ├── src
│   │   │   ├── main
│   │   │   ├── test
│   │   ├── mvnw
│   │   ├── pom.xml
│   ├── model
│   ├── index.js
├── dist (or build
└── .gitignore
```

Source code and artifacts related to the front-end would go in `./packages/clients`.  
Source code and artifacts related the server would go in `./packages/server/`
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

#### 3. To start server-side app

## Contribution
Everyone is welcomed to contribute to this project. To start contribution, either Create an Issue, or Create a Pull Request. All new enhancements should be cloned from `dev`, and PR to `dev` before release. As features, enhancements, and bug fixes are ready for release, 
