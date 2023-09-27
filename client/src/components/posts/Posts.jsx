import "./posts.scss";
import Post from "../post/Post";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

function Posts({ userId }) {
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["Posts"], async () => {
    const res = await makeRequest.get("/post?userId=" + userId, {
      withCredentials: true,
    });
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
