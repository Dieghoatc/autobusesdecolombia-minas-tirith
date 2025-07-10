import { ApiPhoto } from "@/services/types/photo.type";
import { orderById } from "./orderById";

export function getFirstItemToArray(data: ApiPhoto[]){
  const orderArray = orderById(data, "photo_id");

  return orderArray[0];
}