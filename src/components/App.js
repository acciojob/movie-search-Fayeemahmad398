import React, { useState } from "react";
import "./../styles/App.css";
import axios from "axios";
const apikey = `1615fe9d`;
const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isFound, setFound] = useState("");
  const url = `https://www.omdbapi.com/?&apikey=${apikey}&s=${search}`;
  function fetchData() {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        if (response.data.Response === "True") {
          setData(response.data.Search);
          setFound("");
        } else if (response.data.Response === "False") {
          setFound("Invalid movie name. Please try again.");
          setData({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <h3>Search movie</h3>
      <div>
        <input
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      {data.length > 0 ? (
        <div>
          {data.map((obj, index) => {
            return (
              <div key={index}>
                <ul>
                  <li>
                    <h2>
                      {obj.Title} {`(${obj.Year})`}
                    </h2>
                  </li>
                </ul>
                <img src={obj.Poster} alt="" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="error">{isFound}</div>
      )}
    </div>
  );
};

export default App;
