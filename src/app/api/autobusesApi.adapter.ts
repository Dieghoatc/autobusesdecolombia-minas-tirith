
const URL = "https://autobusesdeecolombiaapi.onrender.com/photos"

export interface PhotoApiResponse {
    author: string
    bodywork: string
    company: string
    created_at: string
    description: string
    engine: string
    photo_id: number
    serial: string
    url: string
}

export async function autobusesApiAdapter() {

    const response = await fetch(URL)
    const data = response.json()
    
    return data
}
