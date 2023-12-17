import {SchemaEntry} from "../schemaEntry";
import {author, book, library} from "../test-types/types";
import {zodToGraphQLSchema} from "../zodToGraphQLSchema";

const schemas: Record<string, SchemaEntry> = {
  Author: { schema: author },
  Book: { schema: book },
  Library: { schema: library, idField: "id" },
};

const generatedSchema = zodToGraphQLSchema(schemas, 'Int');
console.log(generatedSchema);
