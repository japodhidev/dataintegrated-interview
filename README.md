# Data Integrated Interview Test Answer

The project is built using [Next.js](https://nextjs.org/). It's an attempt at providing an answer to a set os interview questions posed by [Data Integrated](https://dataintegrated.co.ke/)

The project's purpose is to demonstrate the usage of the [JSON Patch](https://jsonpatch.com/) specification.
Only the `replace` operation is demonstrated in this project.

A user interface exists at the `/dashboard` route.
Authorization is however required to access the `/dashboard` route. An endpoint, `/api/data` is responsible for sending and receiving data.

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

Build and run the docker image

```sh
docker build -t di-docker .
docker run -p 3000:3000 di-docker
```

The project should be available at `http://localhost:3000`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
