import { ZodObject, ZodType } from "zod";
import { getGraphQLTypeFromZod } from "./getGraphQLTypeFromZod";
import { SchemaEntry } from "./schemaEntry";

const convertToSchemaMap = (schemas: Record<string, SchemaEntry>) => {
  const schemasMap = new Map<string, ZodObject<any>>();
  for (const [key, { schema }] of Object.entries(schemas)) {
    schemasMap.set(key, schema);
  }
  return schemasMap;
}

export const zodToGraphQLSchema = (
  schemas: Record<string, SchemaEntry>,
  numberType: string = 'Float'
): string => {
  let schemaString = '';
  for (const [schemaName, { schema, idField }] of Object.entries(schemas)) {
    schemaString += `type ${schemaName} {\n`;
    for (const [propertyName, propertySchema] of Object.entries(schema.shape)) {
      let graphQLType = getGraphQLTypeFromZod(
        propertySchema as ZodType<any>,
        convertToSchemaMap(schemas),
        numberType
      );
      if (propertyName === idField) {
        graphQLType = 'ID!';
      }
      schemaString += `  ${propertyName}: ${graphQLType}\n`;
    }
    schemaString += '}\n';
  }
  return schemaString;
};
