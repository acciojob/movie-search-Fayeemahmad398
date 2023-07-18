import React, { useState } from "react";
import "./../styles/App.css";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    // console.log(name)
    let url = "http://www.omdbapi.com";
    axios
      .get(url, {
        
        params: {
          apikey: "a5fe31d8",
          s: name, //movie name search by user
          type: "movie",
        },
      })
      .then((response) => {
        console.log(response.data.Search);
        setMovies(response.data.Search);
        setName("");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {/* Do not remove the main div */}
      <h3>Search Movie</h3>
      <form>
        <input
          type="text"
          placeholder="search"
          name="search-bar"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>

      {movies ? (
        <ul>
          {movies.map((obj) => {
            return (
              <li>
                <h2>{obj.Title}</h2>
                <img src={obj.Poster} alt={obj.Title} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="error">Invalid movie name. Please try again.</h2>
      )}
    </div>
  );
};

export default App;
