# Zod to GraphQL converter

This is work in progress. Do not use in production.

## Install

```bash
yarn install
```

## Run tests

```bash
yarn test
```

## Usage example

```typescript
import {z} from "zod";
import { SchemaEntry } from "./schemaEntry";
import { author, book } from "./test-types/types";
import { zodToGraphQLSchema } from "./zodToGraphQLSchema";

export const author = z.object({
  name: z.string(),
  bio: z.string().optional(),
});

export const book = z.object({
  name: z.string(),
  author: author,
  isbn: z.number(),
});

const schemas: Record<string, SchemaEntry> = {
  Author: { schema: author },
  Book: { schema: book, idField: "name" },
};

const generatedSchema = zodToGraphQLSchema(schemas, 'Int');
```
