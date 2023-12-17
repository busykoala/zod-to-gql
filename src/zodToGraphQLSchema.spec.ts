import { SchemaEntry } from "./schemaEntry";
import { author, book, library } from "./test-types/types";
import {zodToGraphQLSchema} from "./zodToGraphQLSchema";

describe("zodToGraphQLSchema", () => {
  it("generates GraphQL schema from Zod schemas", () => {
    const schemas: Record<string, SchemaEntry> = {
      Author: { schema: author },
      Book: { schema: book },
      Library: { schema: library, idField: "id" },
    };

    const expectedSchema = `
      type Author {
        name: String!
        bio: String
      }
      type Book {
        name: String!
        author: Author!
        isbn: Int!
      }
      type Library {
        id: ID!
        name: String!
        books: [Book!]!
      }
    `;

    const generatedSchema = zodToGraphQLSchema(schemas, 'Int');

    // Remove whitespace for comparison
    const cleanedExpectedSchema = expectedSchema.replace(/\s+/g, "");
    const cleanedGeneratedSchema = generatedSchema.replace(/\s+/g, "");

    expect(cleanedGeneratedSchema).toEqual(cleanedExpectedSchema);
  });
});
