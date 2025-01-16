//const URL = "http://localhost:3001/photos";

export interface ApiResponse {
  author: string;
  bodywork: string;
  category: string;
  chassis: string;
  company: string;
  created_at: string;
  description: string;
  photo_id: number;
  plate: string;
  serial: string;
  url: string;
}

const URL = "https://autobusesdeecolombiaapi.onrender.com/photos/image";

export async function autobusesApiAdapter() {
    
  if (!URL) return [];

  try {
    const response = await fetch(URL);
    const result: ApiResponse[] = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
