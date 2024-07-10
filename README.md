# Football League Web UI

Welcome to the Football League Web UI project. The goal of the project is to build a browser based web frontend SPA that gets the data about match schedule/results from the backend and then computes a leaderboard and a brackets layout.

## Install Dependencies

This solution requires NodeJs v16 installed.

In order to install project dependencies run:

> **npm** install

## Running Backend Mock Server

To run the mock server run the following command:

> **node** server.js dev-mock-server-config.json

After this you would be able to access backend at http://localhost:3001. To verify if the server is running you can run:

> **curl** http://localhost:3001/api/version

The response should be `{"success": true, "version": "1.0"}`

## Running Frontend Application

The following command will run the SPA in local dev server:

> **npm** start

The application will be available at http://localhost:3000 and by default you should see a welcome message there.

## Production Build

In order to prepare production build you need to run:

> **npm** run build

## Run tests

The test file to verify src/services/LeagueService.js is located at tests/leaderboard.test.js.

To run the tests just run this command.

```shell
npm test
```
