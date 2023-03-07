import React from "react"

interface Props {
    cast_info:{
        adult: boolean;
        cast_id:number;
        character:string;
        credit_id:string;
        gender:number;
        id:number;
        known_for_department:string;
        name:string;
        order:number;
        original_name:string;
        popularity:number;
        profile_path:string;
    }
}

export default function CastCard({cast_info}:Props){
    return(
        <div className="cast-card">
            <img className="cast-img" src={`https://image.tmdb.org/t/p/w185${cast_info.profile_path}`} />
            <h5>{cast_info.original_name}</h5>
            {cast_info.character && <p><i>"{cast_info.character}"</i></p>}
        </div>
    )
}