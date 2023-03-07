import React from "react"
import { Link } from "react-router-dom"

interface Props {
    id:string;
    name: string;
    desc: string;
    poster: string;
}

const linkStyle = {
    textDecoration: "none",
    color: 'white',
};

export default function FilmCard({id, name, desc, poster }: Props) {
    return (
        <Link to={`/film/${id}`} style={linkStyle}>
            <div className="film-card-container">
                <img className="card--img" src={`https://image.tmdb.org/t/p/w185${poster}`} />
                <div className="info">
                    <h1 className="card-title">{name}</h1>
                    <p className="card-desc">{desc}</p>
                </div>
            </div>
        </Link>
    )
}