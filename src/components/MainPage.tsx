import { useState, useEffect } from "react"
import FilmCard from "./FilmCard"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"



export default function MainPage() {
    const [blur, setBlur] = useState<number>(0.15)

    async function makeRequest(page: number) {
        let source = axios.CancelToken.source()
        const cancelToken = source.token
        let endpoint = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`
        const response = await axios({
            method: 'POST',
            url: "http://localhost:4000/",
            data: { endpoint },
            withCredentials: true,
            cancelToken
        })
        return response
    }


    const { data, isSuccess, hasNextPage, fetchNextPage } = useInfiniteQuery(
        ["infiniteFilms"],
        ({ pageParam = 1 }) => makeRequest(pageParam),
        {
            getNextPageParam: (lastPage, allPages: any) => {
                const nextPage = allPages.length + 1
                return nextPage
            }
        }
    )


    


    useEffect(() => {
        let fetching = false;
        async function handleScroll(e: any) {
            if (window.scrollY < 1000) {
                setBlur(() => window.scrollY / 50)
            }
            const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
                fetching = true
                if (hasNextPage) await fetchNextPage()
                fetching = false
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            console.log("removed")
        };
    }, [fetchNextPage, hasNextPage])


    const movieElements = isSuccess && data?.pages?.map(page =>
        page.data.results.map((item: any) => (
            <FilmCard
                key={item.id}
                id={item.id}
                name={item.title}
                desc={item.overview}
                poster={item.poster_path}
            />
        ))
    )


    return (
        <>

            <div style={{ "--blurValue": `${blur}px` } as React.CSSProperties} className="parallax" />
            <div className='films-container'>
                {movieElements}
            </div>
        </>
    )
}