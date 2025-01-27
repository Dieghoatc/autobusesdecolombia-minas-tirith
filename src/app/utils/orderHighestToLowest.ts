import { ApiResponse } from "../api/autobusesApi.adapter";

export function orderHighestToLowest(data: ApiResponse[]) {
  return data.sort((a, b) => b.photo_id - a.photo_id);
}
