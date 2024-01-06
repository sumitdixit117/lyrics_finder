import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import moment from "moment";

const Lyrics = (props) => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_SEC_KEY}`
      )
      .then((res) => {
        let lyric = res.data.message.body.lyrics;
        let str = lyric.lyrics_body;
        str = str.slice(0, -70);
        setLyrics(str);

        return axios.get(
          `http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_SEC_KEY}`
        );
      })
      .then((res) => {
        let track = res.data.message.body.track;
        setTrack({ track });
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <div className="container col-9">
        <Link to="/" className="btn btn-dark btn-md mb-4">
          Go Back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track.track_name} by{" "}
            <span className="text-secondary">{track.track.artist_name}</span>
          </h5>
          <div className="card-body p-4">
            <p className="card-text">{lyrics}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{" "}
            {track.track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{" "}
            {track.track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            {moment(track.track.first_release_date).format("MM/DD/YYYY")}
          </li>
        </ul>
      </div>
    );
  }
};

export default Lyrics;
