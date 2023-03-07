import React from "react"

interface Props{
    poster:string;
    title:string;
    tagline:string;
    date:string;
    vote:string;
}

export default function FilmOverview({poster, title, tagline, date, vote }: Props){
    return(
        <div className="film-page-overview">
            <img className="page--img" src={`https://image.tmdb.org/t/p/w185${poster}`} />
            <div className="page-infos">
                <h1>{title}</h1>
                {tagline && <h3><i>"{tagline}"</i></h3>}
                <div className="page-infos-flex">
                    <p>{date}</p>
                    <p><strong>{vote}</strong></p>
                </div>
            </div>
        </div>
    )
}