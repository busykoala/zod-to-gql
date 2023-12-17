import {pascalToPluralCamel} from "./pascalToPluralCamel";

describe('pascalToPluralCamel', () => {
  it('should convert PascalCase to plural camelCase', () => {
    expect(pascalToPluralCamel('Library')).toEqual('libraries');
    expect(pascalToPluralCamel('Car')).toEqual('cars');
    expect(pascalToPluralCamel('InternetProvider')).toEqual('internetProviders');
  });
});

