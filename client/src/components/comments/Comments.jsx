import * as React from "react";
import "./comments.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";


function Comments({ postId }) {
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: comments,
  } = useQuery(["comments", postId], async () => {
    const res = await makeRequest.get(`/comment/${postId}`);
    return res.data;
  });

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>send</button>
      </div>
      {isLoading ? "Loading..." : (comments && comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.userName}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))) }

      
    </div>
  );
}

export default Comments;
