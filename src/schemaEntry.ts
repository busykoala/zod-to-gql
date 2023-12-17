import {ZodObject} from "zod";

export interface SchemaEntry {
  schema: ZodObject<any, any, any>;
  idField?: string;
}
