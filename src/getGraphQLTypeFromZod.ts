import { ZodObject, ZodString, ZodArray, ZodType, ZodNumber, ZodBoolean, ZodOptional } from "zod";

export const getGraphQLTypeFromZod = (
  zodType: ZodType<any>, schemaMap: Map<string, ZodObject<any>>, numberType: string = 'Float'
): string => {
  let graphQLType;
  let baseType = zodType;
  let isOptional = false;

  if (zodType instanceof ZodOptional) {
    baseType = zodType.unwrap();
    isOptional = true;
  }

  if (baseType instanceof ZodString) {
    graphQLType = 'String';
  } else if (baseType instanceof ZodArray) {
    const elementType = baseType.element;
    graphQLType = `[${getGraphQLTypeFromZod(elementType, schemaMap, numberType)}]`;
  } else if (baseType instanceof ZodNumber) {
    graphQLType = numberType;
  } else if (baseType instanceof ZodBoolean) {
    graphQLType = 'Boolean';
  } else {
    for (const [name, schema] of schemaMap) {
      if (baseType === schema) {
        graphQLType = name;
        break;
      }
    }
  }

  graphQLType = graphQLType || 'Unknown';
  return isOptional ? graphQLType : `${graphQLType}!`; // Add '!' for non-optional fields
};
