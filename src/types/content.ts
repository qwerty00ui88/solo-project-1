export interface Content {
    id: number
    tmdbId: number
    mediaType: string
    title: string
    originalTitle: string
    posterPath?: string
    backdropPath?: string
}

export interface ContentDetail extends Content {
    popularity: number
    voteAverage: number
    voteCount: number
    releaseDate: string
    overview: string
    genres: {
        id: number
        name: string
    }[]
    runtime: number | null
    tagline: string | null
    credits: {
        cast: []
        crew: []
    }
}
