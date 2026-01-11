import { Response } from "express";
import { decamelizeKeys } from "humps";

export const response = {
   json: function (res: Response, data: any, status: number) {
      if (data.data?.toObject && typeof data.data?.toObject === "function") {
         const id = data.data.id;
         data.data = data.data.toObject();
         if (id) data.data._id = id;
      }

      res.status(status).json(decamelizeKeys(data));
   },
};
