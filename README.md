# Coding Challenge

<p align="center">
  <img width="500" alt="image" src="https://github.com/benjaminbarbe10/angular17-sign-up-form/assets/23261573/2661f663-3294-4931-8ea9-e96cceb07f1e">
</p>

Hello! This is my submission for the coding challenge. I have included a few notes below to help you navigate the project.

## Architecture

First of all, I would like to explain my choices for architecture and design.

- **Standalone** components and no modules: Since Angular 17, components are standalone by default, so I will not be using modules, and that's the recommended approach. I will use imports directly in the component decorator.
- **Bootstrap**: I have used Bootstrap for the UI, as it is a very popular framework and easy to use.
- **Jest**: I have used Jest for testing, as it is the most popular testing framework for JavaScript.
- **Cypress**: I have used Cypress for end-to-end testing, as it is one of the most popular frameworks for e2e testing.
- **app.constant.ts** file: I have created this file to store all the constants of the application.
- **Eslint** and prettier: I have used ESLint and Prettier to format the code and keep it clean.
- **NgIf and NgFor instead of Angular 17 new syntax**: I have used the NgIf/NgFor syntax instead of the new syntax, as I believe most current projects still use it.

## File structure:

I want to keep the structure as simple as possible since it is a simple application. I have created the following folders:

- **src/app/components**: This folder contains all the components.
- **src/app/services**: This folder contains all the services.
- **src/app/models**: This folder contains all the models.
- **src/app/shared**: This folder contains all the shared components.
- **src/app/mocks**: This folder contains all the mocks for testing.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

First, run `npm install` or `yarn install` to install all the dependencies.

Run `ng serve` or `yarn start` or `npm run start` for a development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building for production and running the server locally

Run `yarn build:prod` or `npm run build:prod` to build the project for production. The build artifacts will be stored in the `dist/` directory.

You can then install http-server to run the application locally: `npm install http-server -g`

Afterward, run `http-server dist/coding-challenge/browser`. It will be available at:

- http://127.0.0.1:8080
- http://192.168.1.31:8080

## Running unit tests using Jest

Run `ng test` or `yarn test` or `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).

## Running end-to-end tests using Cypress

Run `ng e2e` or `yarn e2e` or `npm run e2e` to execute the end-to-end tests using [Cypress](https://www.cypress.io/).

Alternatively, run `yarn cypress:run` or `npm run cypress:run` to run all tests. (It points to the local application, so you also have to run the application locally using `ng serve` or `yarn start` or `npm run start`)

## Running linting

Run `ng lint` or `yarn lint` or `npm run lint` to execute the linting tests using [ESLint](https://eslint.org/).

## Running prettier

Run `yarn prettier` or `npm run prettier` to execute prettier.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help, feel free to contact me: **benjamin@techspike.fr**.
