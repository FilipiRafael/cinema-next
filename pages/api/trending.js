import { apiKey, apiBase } from '../../lib/tmdb' 

export default async (request, response) => {
    const result = await fetch(`${apiBase}/trending/movie/week?api_key=${apiKey}&language=pt-BR`)
    const json = await result.json()

    response.status(200).json({
        list: json.results
    });
}