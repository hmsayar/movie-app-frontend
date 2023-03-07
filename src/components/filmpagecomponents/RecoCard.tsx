import React from "react"
import {Link} from "react-router-dom"

interface Props {
    movie: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: Array<number>;
        id: number;
        media_type: string;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }
}

const linkStyle = {
    textDecoration: "none",
    color: 'white',
};

export default function RecoCard({ movie }: Props) {

    return (
        <Link to={`/film/${movie.id}`} style={linkStyle}>
        <div className="cast-card reco-card">
            <img className="cast-img reco-img" src={`https://image.tmdb.org/t/p/w185${movie.backdrop_path}`} />
            <h5>{movie.title}</h5>
        </div>
        </Link>
    )
}