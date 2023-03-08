import { useState, useRef } from "react"
import useCustomQuery from "../hooks/useCustomQuery";
import axios from "axios";
import { Link } from "react-router-dom"

const linkStyle = {
    textDecoration: "none",
    color: 'black',
};

export default function SearchBar() {

    const [searchInput, setSearchInput] = useState('');
    const containerRef = useRef<HTMLDivElement>()

    async function makeRequest(): Promise<any> {
        let endpoint = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&language=en-US&page=1`
        const response = await axios({
            method: 'POST',
            url: "http://localhost:4000/",
            data: { endpoint },
            withCredentials: true,
        })
        return response.data
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

    return (
        <div className="searchbar-container">
            <div className="searchbar-input-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search Movies"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            {searchResults?.results.length !== 0 && <div className="search-result-container">
                <ul>
                    {
                        searchResults?.results.slice(0, 5).map((item: any) => {
                            return (
                                <li key={item.id}>
                                    <Link to={`/film/${item.id}`} style={linkStyle}>
                                        {item.title}
                                    </Link>
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