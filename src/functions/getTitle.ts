export async function getServerData(URL: string): Promise<Response> {
    const response = await fetch(URL);
    const data = await response.json();
    return new Response(JSON.stringify({ mensaje: data.title }), {
        headers: { 'Content-Type': 'application/json' }
    });
}