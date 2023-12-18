# Zod to GraphQL converter

Current limitations:
- many unsupported type mappings
- query does not yet contain any parameters
- no mutations generated
- order of types are according to mapping provided

## Install Package

```bash
yarn install zod-to-gql
```

## Run tests

```bash
yarn install
yarn test
```

## Usage example

Run the minimal example:

```bash
yarn run ts-node ./src/examples/minimal.ts
```

Run an example where the types are used in a simple Apollo server:

```bash
yarn run ts-node ./src/examples/apolloServer.ts
```
