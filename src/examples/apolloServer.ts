import { ApolloServer, gql } from 'apollo-server';
import {SchemaEntry} from '../schemaEntry';
import {author, book, library} from '../test-types/types';
import {zodToGraphQLSchema} from '../zodToGraphQLSchema';

const authors = [
  { name: 'Author 1', bio: 'Bio for Author 1' },
  { name: 'Author 2', bio: 'Bio for Author 2' },
];

const books = [
  { name: 'Book 1', author: authors[0], isbn: '1234567890' },
  { name: 'Book 2', author: authors[1], isbn: '0987654321' },
];

const libraries = [
  { id: '1', name: 'Library 1', books: [books[0], books[1]] },
];

const schemas: Record<string, SchemaEntry> = {
  Author: { schema: author },
  Book: { schema: book },
  Library: { schema: library, idField: "id" },
};

const typeDefs = gql`
${zodToGraphQLSchema(schemas)}
`;

const resolvers = {
  Query: {
    authors: () => authors,
    books: () => books,
    libraries: () => libraries,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

interface ServerInfo {
  url: string;
}

server.listen({ port: 4000 }).then(({ url }: ServerInfo) => {
  console.log(`Apollo Server is running at ${url}`);
});
