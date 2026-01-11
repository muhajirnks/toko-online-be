import { Model, QueryFilter, Types } from "mongoose";
import { ParsedQs } from "qs";
import { PaginationQS, PaginationResult } from "./models";

export const bindPaginationQS = (qs: ParsedQs): PaginationQS => {
   return {
      page: qs.page as string,
      limit: qs.limit as string,
      sort: qs.sort as string,
      direction: qs.direction as "asc" | "desc",
      search: qs.search as string,
   };
};

export class Pagination<T> {
   private model: Model<T>;
   private page: number = 1;
   private limit: number = 10;

   public constructor(model: Model<T>, page: string | number, limit: string | number) {
      this.model = model;

      if (typeof page == 'string') {
         page = parseInt(page, 10)
      }

      if (typeof limit == 'string') {
         limit = parseInt(limit, 10)
      }

      if(page) this.page = page;
      if(limit) this.limit = limit;
   }

   public async paginate(query: QueryFilter<T> = {}): Promise<PaginationResult<any>> {
      const offset = (this.page - 1) * this.limit;
      const total = await this.model.find(query).countDocuments();

      let q = this.model.find(query).skip(offset);

      const data = await q.limit(this.limit).lean();

      const tfData = data.map((d) => ({
         ...d,
         _id: (d._id as Types.ObjectId).toString(),
      }));

      return {
         meta: {
            total,
            perPage: this.limit,
            currentPage: this.page,
            lastPage: Math.ceil(total / this.limit),
         },
         data: tfData,
      };
   }
}
