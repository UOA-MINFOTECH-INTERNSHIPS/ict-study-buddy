import "./rightbar.scss";
import photo from "../../assets/register-background-pic.jpg";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

function RightBar() {
  // Use a query to fetch recent posts for the "Latest Activities" section
  const {
    isLoading, // Flag to indicate if data is still loading
    error, // If there's an error in data retrieval
    data: posts, // Recent posts data fetched from the API
  } = useQuery(["Posts"], async () => {
    const res = await makeRequest.get("/post/recent-posts");
    return res.data;
  });

  return (
    <div className="rightBar">
      <div className="container">
        {posts && (
          <div className="item">
            <span>Latest Activities</span>
            {posts.map((post, index) => (
              <div className="user" key={index}>
                <div className="userInfo">
                  <img src={post.userInfos.profilePic} alt="User Avatar" />
                  <p>
                    <span>{post.userInfos.userName}</span> Created a new post
                  </p>
                </div>
                <span className="date">{moment(post.createdAt).fromNow()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/16943679/pexels-photo-16943679/free-photo-of-ranti-marsyanda-chandri-anggara.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="User Avatar"
              />
              <div className="online" />
              <span>Jenny</span>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <span>Jay Chow</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
