# AppSync VTL resolvers unit tests example

This example shows you how to unit test your `.vtl` resolvers.
The idea is to use tools exposed by `amplify-appsync-simulator` but do not use the _amplify cli_ / _console_ / _appsync console_ directly.

## How this works

Inside the test file - `resolver.test.ts`, I'm creating the `AmplifyAppSyncSimulator` manually. Most of the configuration can be omitted, since we are only interested in our mapping templates.
This is why I've specified a lot of parameters with _mock_ prefix - they have to be specified, but are not used.

Next, the `AppSyncUnitResolver` is created. This component actually parses our templates. All we have to do next is just call `resolve` on it.

## Requirements to run

- Docker
- Node.js 12+

## How to run this example

First, spin up local `dynamoDB` Docker container

```bash
make dynamo
```

Next, initialize and seed the table

```bash
npm run init-dynamo
```

Then you can run the test file

```bash
npm t
```
