
const URL = "https://autobusesdeecolombiaapi.onrender.com/photos"

export interface PhotoResponse {
    id: string
    url: string
    company: string
    bodywork: string
    engine: string
    serial: string

}

export async function autobusesApiAdapter() {

    const response = await fetch(URL)
    const data = response.json()
    
    console.log(data)
    return data
}
