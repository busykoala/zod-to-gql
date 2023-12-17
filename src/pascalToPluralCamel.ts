const pluralize = require('pluralize');

export const pascalToPluralCamel = (input: string): string => {
  return pluralize.plural(input[0].toLowerCase() + input.slice(1));
};
