import { useState, useRef, useEffect } from "react"
import useCustomQuery from "../hooks/useCustomQuery";
import axios from "axios";
import { Link } from "react-router-dom"

const linkStyle = {
    textDecoration: "none",
    color: 'black',
};

export default function SearchBar() {

    const [searchInput, setSearchInput] = useState('');
    const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>

    async function makeRequest(): Promise<any> {
        let endpoint = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&language=en-US&page=1`
        const response = await axios({
            method: 'POST',
            url: "http://localhost:4000/",
            data: { endpoint },
            withCredentials: true,
        })
        return response.data.results
    }

    const { data: searchResults } = useCustomQuery(
        {
            params: ['searchResults', searchInput],
            request: () => makeRequest(),
            debounce: 750
        }
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchInput(() => e.target.value)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            console.log("unmounted")

        };
    }, []);

    function handleMouseDown(event: any) {
        if (!containerRef.current.contains(event.target)) {
            setSearchInput(() => "")
        }
    }
    console.log(searchResults)

    return (
        <div className="searchbar-container" ref={containerRef}>
            <div className="searchbar-input-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search Movies"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            {searchResults?.length !== 0 &&
                <div className="search-result-container">
                    <ul>
                        {
                            searchResults?.slice(0, 5).map((item: any) => {
                                return (
                                    <li key={item.id}>
                                        <div className="search-result">
                                            <Link to={`/film/${item.id}`} style={linkStyle}>
                                                <div className="search-result-flex">
                                                    <img className="search-img" src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} />
                                                    <p>{item.title}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
        </div>
    )
}