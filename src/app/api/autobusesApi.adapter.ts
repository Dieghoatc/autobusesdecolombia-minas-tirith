
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


export async function autobusesApiAdapter() {
    const URL = process.env.NEXT_PUBLIC_ABC_API

    if(!URL) return []

    try {
        const response = await fetch(URL);
        const result: ApiResponse[] = await response.json();
        return result;
    }
    catch (error) {
        console.log(error);
        return []
    }

}
