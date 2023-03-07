import {useEffect} from "react"
import { useParams } from "react-router-dom"
import { useQueries } from "@tanstack/react-query"
import axios from "axios"
import FilmOverview from "./filmpagecomponents/FilmOverview"
import CardSlider from "./filmpagecomponents/CardSlider"
import CastCard from "./filmpagecomponents/CastCard"
import RecoCard from "./filmpagecomponents/RecoCard"

export default function FilmPage() {
    const { filmId } = useParams()

    async function makeRequest(query: string): Promise<any> {
        let source = axios.CancelToken.source()
        const cancelToken = source.token
        let endpoint = query
        const response = await axios({
            method: 'POST',
            url: "http://localhost:4000/",
            data: { endpoint },
            withCredentials: true,
            cancelToken
        })
        return response.data
    }

    const [filmQuery, recommendQuery] = useQueries({
        queries: [
            {
                queryKey: ['films'],
                queryFn: () => {
                    return (makeRequest(`https://api.themoviedb.org/3/movie/${filmId}?&language=en-US&append_to_response=credits`))
                }
            },
            {
                queryKey: ['recommend'],
                queryFn: () => {
                    return (makeRequest(`https://api.themoviedb.org/3/movie/${filmId}/recommendations?language=en-US&page=1`))
                }
            },
        ],
    });

    useEffect(()=>{
        filmQuery.refetch()
        recommendQuery.refetch()
    },[filmId])

    return (
        <div className="film--page">
            {filmQuery.isSuccess && <FilmOverview
                poster={filmQuery.data.poster_path}
                title={filmQuery.data.title}
                tagline={filmQuery.data.tagline}
                date={filmQuery.data.release_date}
                vote={filmQuery.data.vote_average}
            />}

            <CardSlider gradientDirection="to top">
                {filmQuery.isSuccess && filmQuery.data.credits?.cast.map((item: any) => (<CastCard key={item.id} cast_info={item} />))}
            </CardSlider>

            <CardSlider gradientDirection="to bottom">
                {recommendQuery.isSuccess && recommendQuery.data.results?.map((item: any) => (<RecoCard key={item.id} movie={item} />))}
            </CardSlider>

        </div>
    )
}