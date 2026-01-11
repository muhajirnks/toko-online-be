import { Model } from "mongoose";

export interface ErrorResponse {
   field: string;
   message: string;
}

export interface RuleResponse {
   result: boolean;
   message?: string;
}

export interface RuleFunction {
   (params: RuleFunctionParams): Promise<RuleResponse>;
}

export interface SchemaContent {
   name: string;
   rules: RuleFunction[];
}

export type SchemaField<T> = {
   [P in keyof T]: SchemaContent;
};

export type Schema<T> = {
   bind: (data: any, model?: Model<any>) => Promise<T>;
};

export interface ValidateParams<T> {
   data: T;
   schema: Schema<T>;
   model?: Model<any>;
}

export interface RuleFunctionParams {
   name: string;
   value: any;
   field: string;
   data: any;
   schema: SchemaField<any>;
   model?: Model<any>;
}
