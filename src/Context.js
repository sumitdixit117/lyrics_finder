import React, { useState, useEffect } from "react";
import axios from "axios";

export const Context = React.createContext();

export function ContextController({ children }) {
  let intialState = {
    track_list: [],
    heading: "",
  };

  const [state, setState] = useState(intialState);

  useEffect(() => {
    axios
      .get(
        `http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=20&f_has_lyrics=1&apikey=${process.env.REACT_APP_SEC_KEY}`
      )
      .then((res) => {
        setState({
          track_list: res.data.message.body.track_list,
          heading: "Top 20 Tracks",
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}
