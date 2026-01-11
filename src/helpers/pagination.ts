import { FilterQuery, Model, SortOrder, Types } from "mongoose";
import { ParsedQs } from "qs";

export interface PaginationQS {
   page: string;
   limit: string;
   sort: string;
   direction: string;
   search: string;
}

export const bindPaginationQS = (qs: ParsedQs): PaginationQS => {
   const {
      page = "1",
      limit = "10",
      sort = "createdAt",
      direction = "desc",
      search = "",
   } = qs;

   return {
      page: page as string,
      limit: limit as string,
      sort: sort as string,
      direction: direction as string,
      search: search as string,
   };
};

export class Pagination<T> {
   private model: Model<T>;
   private selected: string = '';
   private query: FilterQuery<T> = {};
   private sortOrder: [string, SortOrder][] = [["createdAt", "desc"]];

   public constructor(model: Model<T>) {
      this.model = model;
   }

   public select(selected: string) {
      this.selected = selected;
      return this;
   }

   public find(query: FilterQuery<T> = {}) {
      this.query = query;
      return this;
   }

   public sort(sorts: [string, SortOrder][]) {
      this.sortOrder = sorts;
      return this;
   }

   public async paginate(page = "1", limit = "10") {
      const pageInt = parseInt(page, 10);
      const limitInt = parseInt(limit, 10);
      const offset = (pageInt - 1) * limitInt;
      const total = await this.model.find(this.query).countDocuments();

      let q = this.model
         .find(this.query)
         .skip(offset)

      if (this.selected) {
         q = q.select(this.selected)
      }

      const data = await q
         .limit(limitInt)
         .sort(this.sortOrder)
         .lean()

      const tfData = data.map(d => ({ ...d, _id: (d._id as Types.ObjectId).toString() }))

      return {
         meta: {
            total,
            perPage: limitInt,
            currentPage: pageInt,
            lastPage: Math.ceil(total / limitInt),
         },
         data: tfData,
      };
   }
}
