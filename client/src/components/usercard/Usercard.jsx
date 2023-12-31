import "./usercard.scss";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

function Usercard({ user }) {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser._id;

  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: users,
  } = useQuery(["users"], () =>
    makeRequest.get(`/users/${userId}`).then((res) => {
      return res.data;
    })
  );
  const { isLoading: followerLoading, data: followers } = useQuery(
    ["followers"],
    () =>
      makeRequest.get(`/connection/${userId}/followings`).then((res) => {
        return res.data;
      })
  );

  useEffect(() => {
    console.log("current id", currentUser.userName);
    console.log("currentUser.followings", currentUser.followings);
    console.log(", currentUser.followers", currentUser.followers);
    console.log("user,", user);
  });

  const handleFollowToggle = () => {
    mutation.mutate();
  };

  const mutation = useMutation(
    () => {
      return makeRequest.put(`/connection/${user._id}/follow`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followers"]);
      },
    }
  );

  return (
    <div className="box_user">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="avator">
            <div className="img">
              <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={user.profilePic} alt="avatar" />
              </Link>
            </div>

            <div className="info">
              <p>{user.userName}</p>

              <p>{user.major}</p>
            </div>
          </div>
          <div className="content">
            <div className="courses">
              <div className="title">Courses</div>
              <div className="items">
                {user.courses.map((course, index) => (
                  <div className="item" key={index}>
                    {course}
                  </div>
                ))}
              </div>
            </div>
            <div className="skills">
              <div className="title">Skills</div>
              <div className="items">
                {user.skills.map((skill, index) => (
                  <div className="item" key={index}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="self_intr">
              <p>{user.desc}</p>
            </div>
          </div>

          <div className="button">
            <div className="btn_follow">
              {followerLoading ? (
                "Loading..."
              ) : followers.includes(user._id) ? (
                <button onClick={handleFollowToggle}>Following</button>
              ) : (
                <button onClick={handleFollowToggle}>Follow</button>
              )}
            </div>

            <div className="btn_others">
              <button>Block</button>
            </div>
            <div className="btn_others">
              <button>Message</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Usercard;
