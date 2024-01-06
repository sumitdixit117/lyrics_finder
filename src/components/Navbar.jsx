import React, { useContext, useState } from "react";
import { Context } from "../Context";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const darkMode = () => {
    const newTheme = "myDark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  const lightMode = () => {
    const newTheme = "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };
  // eslint-disable-next-line
  const [state, setState] = useContext(Context);

  const homeFunc = () => {
    axios
      .get(
        `http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=20&f_has_lyrics=1&apikey=${process.env.REACT_APP_SEC_KEY}`
      )
      .then((res) => {
        setState({
          track_list: res.data.message.body.track_list,
          heading: "Top 20 Tracks",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-dark px-5 py-3 mb-5 bg-dark">
      <div className="container-fluid px-5">
        <Link to="/" className="navbar-brand mb-0 h1">
          <i className="fa-solid fa-compact-disc"></i>{" "}
          <span onClick={homeFunc}>Lyrics Finder</span>
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {theme === "light" ? (
              <span>
                <i className="fa-regular fa-sun"></i> Light{" "}
              </span>
            ) : (
              <span>
                <i className="fa-solid fa-moon"></i> Dark{" "}
              </span>
            )}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a className="dropdown-item" href="/" onClick={lightMode}>
                Light
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/" onClick={darkMode}>
                Dark
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
