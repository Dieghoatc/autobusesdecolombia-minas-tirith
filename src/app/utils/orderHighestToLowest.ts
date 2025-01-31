import { ApiPhotosResponse } from "../api/autobusesApi.interfaces";

export function orderHighestToLowest(data: ApiPhotosResponse[]) {
  return data.sort((a, b) => b.photo_id - a.photo_id);
}
