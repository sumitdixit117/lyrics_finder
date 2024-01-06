import React, { useState,  useContext } from "react";
import axios from "axios";
import { Context } from "../Context";

const Search = () => {
  // eslint-disable-next-line
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState("");

  const findTrack = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://api.musixmatch.com/ws/1.1/track.search?q_track=${userInput}&page_size=10&page=1&f_has_lyrics=1&s_track_rating=desc&apikey=${process.env.REACT_APP_SEC_KEY}`
      )
      .then((res) => {
        let track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" });
      })
      .catch((err) => console.log(err));
    setUserInput("");
  };

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="card card-body col-8 mx-auto m-5 p-4">
      <h1 className="display-5 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={findTrack} className="col-8 mx-auto">
        <div className="form-group text-center">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
          <button className="btn btn-secondary btn-lg my-3 col-12" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
