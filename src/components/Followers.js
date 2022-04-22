import { useState, useEffect } from "react";

function Followers({ url }) {
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          setFollowers(result);
        },
        (error) => {
          setLoading(false);
        }
      );
  }, [followers, url]);

  return (
    <div className="block followers">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {" "}
          <div className="followers_top">
            <h2>Recent Followers</h2>
            <a href={followers?.user} target="_blank" rel="noopener noreferrer">
              View All
            </a>
          </div>
          <div className="followers_list mt-18">
            {followers.slice(0, 5).map((follower) => {
              return (
                <a
                  href={follower.html_url}
                  className="mt-18 follower"
                  style={{ textAlign: "center" }}
                  key={follower.id}
                >
                  <img src={follower.avatar_url} alt={follower.login} />
                  <p>@{follower.login}</p>
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Followers;
