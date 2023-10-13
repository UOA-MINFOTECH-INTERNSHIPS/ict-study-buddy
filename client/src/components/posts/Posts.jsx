import "./posts.scss";
import Post from "../post/Post";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

function Posts({ userId }) {
  // Use a query to fetch posts for a specific user
  const {
    isLoading, // Flag to indicate if data is still loading
    error, // If there's an error in data retrieval
    data: posts, // Posts data fetched from the API
  } = useQuery(["Posts", userId], async () => {
    const res = await makeRequest.get("/post?userId=" + userId);
    return res.data;
  });

  return (
    <div className="posts">
      {error
        ? "An error has occurred: " + error.message
        : isLoading
        ? "Loading...."
        : posts.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
}

export default Posts;
