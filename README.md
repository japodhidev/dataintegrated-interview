# Data Integrated Interview Test Answer

The project is built using [Next.js](https://nextjs.org/).
It's an attempt at providing an answer to a set of interview questions posed by [Data Integrated](https://dataintegrated.co.ke/)

The project's purpose is to demonstrate the usage of the [JSON Patch](https://jsonpatch.com/) specification.
Only the `replace` operation is demonstrated in this project.

A user interface exists at the `/dashboard` route. This page is the heart of the project.
Authorization is however required to access the `/dashboard` route. Use any valid email address and password to login.

An endpoint, `/api/data` is responsible for sending and receiving data.
As per the interview requirements, accessing this endpoint requires that the `Authorization` `HTTP` header is present.
The header should also include a valid bearer token i.e `Authorization: Bearer token`. Relevant responses will be returned
in the event of an absence of a token or presence of an invalid token. Also, only `GET` & `POST` HTTP methods are currently supported.

A public `Docker` image is available [here](https://hub.docker.com/r/japodhidev/di-docker).

Tests are ran using [Cypress](https://cypress.io/). This seemed like the proper way since it's recommended by [Nextjs](https://nextjs.org/docs/testing).
Only `e2e` tests are available given the limitations that component tests face.

## Getting Started

Setup should be relatively straight-forward.

## Setup

Install dependencies

```bash
npm run dev
```

Run the development server

```bash
npm run dev
```

Start the server

```bash
npm run start
```

Run the linting script

```bash
npm run lint
```

Run tests

```bash
npm run cypress
```

Build and run the docker image

```sh
docker build -t di-docker .
docker run -p 3000:3000 di-docker
```

Alternatively, pull the docker image

```sh
docker run -p 3000:3000 japodhidev/di-docker:latest
```

The project should be available at `http://localhost:3000`, assuming that the port is available for use.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
