import { Model } from "mongoose";

export async function getPagination(
  model: Model<any>,
  queryCondition: object = {},
  currentPage = 1,
  pageSize = 10,
  orderBy: object = { "_id": -1 }) {
  const skip = (currentPage - 1) * pageSize;
  const itemList = await model.find(queryCondition)
    .skip(skip)
    .limit(pageSize)
    .sort(orderBy)
    .exec();
  return {
    itemList,
    total: await model.countDocuments(queryCondition).exec(),
    currentPage,
    pageSize
  };
}
