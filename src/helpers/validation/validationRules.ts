import CustomError from "../customError";
import {
   errorAlreadyExists,
   errorMaxLength,
   errorMinLength,
   errorNotSame,
   errorNotSend,
   errorNotValid,
   errorNotValidEmail,
   errorNumeric,
   errorSpesificLength,
} from "../responseMessage";
import { RuleFunction } from "./validationContract";

/**
 * Check if the value is a valid email
 */
export const isEmail =
   (): RuleFunction =>
      async ({ name, value }) => {
         if (!value) return { result: true };

         const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         const result = re.test(value);

         return {
            result,
            message: !result ? errorNotValidEmail(name) : undefined,
         };
      };

/**
 * Check if the value is number or string numeric
 */
export const isNumeric =
   (): RuleFunction =>
      async ({ name, value }) => {
         if (!value) return { result: true };

         const result = !isNaN(value);

         return {
            result,
            message: !result ? errorNumeric(name) : undefined,
         };
      };

/**
 * Check if the value is float
 */
export const isFloat =
   (): RuleFunction =>
      async ({ name, value }) => {
         if (!value) return { result: true };

         const result = Number(value) === value && value % 1 !== 0;

         return {
            result,
            message: !result ? errorNotValid(name) : undefined,
         };
      };

/**
 * Check if the value length is same as or longer than tne given parameter
 */
export const minLength =
   (length: number): RuleFunction =>
      async ({ name, value }) => {
         if (!value) return { result: true };

         const result = value.length >= length;

         return {
            result,
            message: !result ? errorMinLength(name, length) : undefined,
         };
      };

/**
 * Check if the value length is same as or shorter than the given parameter
 */
export const maxLength =
   (length: number): RuleFunction =>
      async ({ name, value }) => {
         if (!value) return { result: true };

         const result = value.length <= length;

         return {
            result,
            message: !result ? errorMaxLength(name, length) : undefined,
         };
      };

/**
 * Check if the value length is same as the given parameter
 */
export const spesificLength =
   (length: number): RuleFunction =>
      async ({ name, value }) => {
         if (!value) return { result: true };

         const result = value.length == length;

         return {
            result,
            message: !result ? errorSpesificLength(name, length) : undefined,
         };
      };

/**
 * Check if the value is not null or undefined or blank
 */
export const required =
   (): RuleFunction =>
      async ({ name, value }) => {
         const result = Boolean(value);

         return {
            result,
            message: !result ? errorNotSend(name) : undefined,
         };
      };

/**
 * Check if the value is same as given field
 */
export const isSame =
   (targetField: string): RuleFunction =>
      async ({ name, value, data, schema }) => {
         const result = data[targetField] == value;

         return {
            result,
            message: !result
               ? errorNotSame(name, schema[targetField].name)
               : undefined,
         };
      };

/**
 * Check if the value is not already exist in database
 * (You need to give model on `validate` parameter)
 */

export const unique =
   (existedDataId?: string | number): RuleFunction =>
      async ({ name, value, field, model }) => {
         if (!value) return { result: true };
         if (!model) throw new CustomError("Pick model for unique validation", 500);

         let result: boolean;

         if (existedDataId) {
            const q = await model.findOne({
               [field]: value,
               id: {
                  $ne: existedDataId,
               },
            });

            result = !Boolean(q);
         } else {
            const q = await model.findOne({
               [field]: value,
            });

            result = !Boolean(q);
         }

         return {
            result,
            message: !result ? errorAlreadyExists(name) : undefined,
         };
      };

/**
 * Check if the given `targetField` value is null,
 * then the current field is required.
 * else, the current field must be null
 */

export const nullIfSend =
   (targetField: string): RuleFunction =>
      async ({ name, value, data, schema }) => {
         const isSent = Boolean(data[targetField]);
         const result = isSent ? !Boolean(value) : Boolean(value);

         return {
            result,
            message: !result
               ? isSent
                  ? `${name} must be empty if ${schema[targetField].name} is filled`
                  : `One of ${name} or ${schema[targetField].name} must be filled in`
               : undefined,
         };
      };
