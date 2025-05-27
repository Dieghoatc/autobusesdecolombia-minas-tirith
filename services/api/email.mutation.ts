
const URL = process.env.NEXT_PUBLIC_ABC_API;

export interface PostMessage{
    email: string,
    subject: string,
    message: string
}

async function fetchData( message: PostMessage): Promise<string> {

  if (!URL) return "Url not found"

  try {
    const response = await fetch(`${URL}/contact`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return Promise.reject(error);
  }
}

export async function emailMutation(message: PostMessage): Promise<string> {
  return fetchData(message)
}
