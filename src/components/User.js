import { Octokit } from "@octokit/rest";
import FlashMessage from "react-flash-message";
import { useState } from "react";

function User({ user }) {
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
    userAgent: "skylight v1",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle_follow = async () => {
    setLoading(true);
    setMessage(false);

    const response = await octokit.request(
      `PUT /user/following/${user.login}`,
      {
        username: user.login,
      }
    );

    if (response.status === 204) {
      setLoading(false);
      setMessage(true);
    }
  };
  return (
    <>
      {message && (
        <FlashMessage duration={3000} persitOnHover={true}>
          <div className="message success">
            <svg width={`16px`} height={`16px`}>
              <use href="#icon-error" fill="#fff" />
            </svg>
            <strong className="ml-12">Followed user</strong>
          </div>
        </FlashMessage>
      )}
      <div className="block user">
        <div className="user-top">
          <figure>
            <img src={user.avatar_url} alt="" srcSet="" />
            <figcaption>{user.name}</figcaption>
          </figure>
          <button
            onClick={handle_follow}
            className={`btn btn-white ${loading ? "loader" : ""}`}
          >
            Follow
          </button>
        </div>
        <div className="user-bio">
          {user.bio == null ? (
            <p>This user dosent have a bio</p>
          ) : (
            <p>{user.bio}</p>
          )}
        </div>
        <div className="mt-18">
          <span>{user.followers} Followers</span>
          <span className="ml-12">{user.following} Following</span>
        </div>
        <div className="mt-18 user-links">
          {user.blog ? (
            <a href={user.blog} className="btn btn-default">
              <svg width={`18px`} height={`18px`}>
                <use href="#icon-link" />
              </svg>
              <span className="ml-12">{user.blog}</span>
            </a>
          ) : (
            ""
          )}
          {user.twitter_username ? (
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              className="btn btn-default"
            >
              <svg width={`18px`} height={`18px`}>
                <use href="#icon-twitter" />
              </svg>
              <span className="ml-12">{user.twitter_username}</span>
            </a>
          ) : (
            ""
          )}
          {user.email ? (
            <a href={user.email} className="btn btn-default">
              <svg width={`18px`} height={`18px`}>
                <use href="#icon-email" />
              </svg>
              <span className="ml-12">{user.email}</span>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default User;
