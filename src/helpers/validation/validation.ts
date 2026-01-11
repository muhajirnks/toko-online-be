import { decamelize } from "humps";
import { ErrorResponse, Schema, SchemaField } from "./validationContract";
import CustomError from "../customError";

export const createSchema = <T>(fields: SchemaField<T>): Schema<T> => {
   return {
      bind: (data, model) => {
         return new Promise(async (resolve, reject) => {
            const errors: ErrorResponse[] = [];
            const validatedData: Partial<T> = {};

            for (const field in fields) {
               if (fields.hasOwnProperty(field)) {
                  const value = data[decamelize(field) as keyof typeof data];
                  const name = fields[field].name;
                  const rules = fields[field].rules;

                  for (const rule of rules) {
                     try {
                        const { result, message = "" } = await rule({
                           name,
                           value,
                           field,
                           data,
                           schema: fields,
                           model,
                        });

                        if (!result) {
                           errors.push({
                              field,
                              message,
                           });

                           break;
                        }
                     } catch (error: any) {
                        reject(new CustomError(error.message, 500));
                     }
                  }

                  validatedData[field] = value;
               }
            }

            if (errors.length > 0) {
               reject({ message: errors[0].message, errors, statusCode: 400 });
            }

            resolve(validatedData as T);
         });
      },
   };
};
