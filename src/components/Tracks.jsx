import React, { useContext } from "react";
import { Context } from "../Context";
import Spinner from "./Spinner";
import Track from "./Track";

const Tracks = () => {
  const [state] = useContext(Context);
  const { track_list, heading } = state;

  if (track_list === undefined || track_list.length === 0) {
    return <Spinner />;
  } else {
    return (
      <>
        <h3 className="text-center my-4">{heading}</h3>
        <div className="row">
          {track_list.map((item) => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    );
  }
};

export default Tracks;
