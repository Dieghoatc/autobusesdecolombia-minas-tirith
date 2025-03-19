import { ApiPhotosResponse } from "../api/dto/photo.dto";
import { orderById } from "./orderById";

export function getFirstItemToArray(data: ApiPhotosResponse[]){
  const orderArray = orderById(data, "photo_id");

  return orderArray[0];
}