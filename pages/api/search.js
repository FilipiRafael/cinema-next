import { apiKey, apiBase } from "../../lib/tmdb"

export default async (request, response) => {
    let movie = request.query.movie
    const result = await fetch(`${apiBase}/search/movie?api_key=${apiKey}&language=pt-BR&query=${movie}`)
    const json = await result.json()

    response.status(200).json({
        list: json.results
    })
}

