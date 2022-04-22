import { useState } from "react";
import User from "./components/User";
import FlashMessage from "react-flash-message";
import Followers from "./components/Followers";

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handle_form = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form_input = document.querySelector(".form_input").value;

    fetch(`https://api.github.com/users/${form_input}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          if (result.message === "Not Found") {
            return setError("User Not Found");
          }
          setUser(result);
        },
        (error) => {
          setLoading(false);
          setError(error.message);
        }
      );
  };

  return (
    <div className="container">
      {error !== null ? (
        <FlashMessage duration={3000} persitOnHover={true}>
          <div className="message error">
            <svg width={`16px`} height={`16px`}>
              <use href="#icon-error" fill="#fff" />
            </svg>
            <strong className="ml-12">{error}</strong>
          </div>
        </FlashMessage>
      ) : (
        ""
      )}
      <header className="header">
        <div className="header-top">
          <svg width={`48px`} height={`48px`}>
            <use href="#icon-github" fill="#fff" />
          </svg>
          <h1>Github Explorer</h1>
        </div>
        <div className="header-search">
          <form className="form" onSubmit={handle_form}>
            <legend className="form_legend block">
              <label htmlFor="form_input" className="sr_only">
                Username
              </label>
              <input
                className="form_input"
                id="form_input"
                type="text"
                placeholder="Enter a username to Search"
                required
              />
              <button
                className={`form_btn ${loading ? "loader" : ""}`}
                type="submit"
              >
                Search
              </button>
            </legend>
          </form>
        </div>
      </header>
      <main>
        {user !== null && <User user={user} />}
        {user !== null && user.followers !== 0 ? (
          <Followers url={user.followers_url} />
        ) : (
          ""
        )}
      </main>
      <footer className="mt-18">
        Made with ❤ by{" "}
        <a
          href="http://twitter.com/sprucekhalifa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spruce Emmanuel
        </a>
      </footer>
    </div>
  );
}

export default App;
