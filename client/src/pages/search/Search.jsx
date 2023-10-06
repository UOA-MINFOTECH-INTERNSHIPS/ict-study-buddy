import "./search.scss";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import Post from "../../components/post/Post";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/RightBar";

function Search() {
  const { result } = useContext(SearchContext);

  const { query } = useParams();

  return (
    <div className="search">
      <LeftBar />
      <div className="searchCenter">
        <div className="title">
          <p>Query: "{query}"</p>
          <p>Results:</p>
          <h1>Post</h1>
        </div>
        <div className="results">
          {result && result.posts && result.posts.length > 0 ? (
            result.posts.map((post, index) => <Post post={post} key={index} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>

        <div className="title">
          <h1>User</h1>
        </div>
        <div className="results">
          {result && result.users && result.users.length > 0 ? (
            result.users.map((user, index) => (
              <div className="box_user" key={index}>
                <div className="avator">
                  <div className="img">
                    <img src={user.profilePic} />
                  </div>

                  <div className="info">
                    <p>{user.userName}</p>
                    {/* <p>{user.desc}</p> */}
                    <p>{user.major}</p>
                  </div>
                </div>
                <div className="content">
                  <div className="wrapper">
                    <div className="courses">
                      <div className="title">Courses</div>
                      {user.courses.map((course, index) => (
                        <div className="items" key={index}>
                          <div className="item">{course}</div>
                        </div>
                      ))}
                    </div>
                    <div className="skills">
                      <div className="title">Skills</div>
                      {user.skills.map((skill, index) => (
                        <div className="items" key={index}>
                          <div className="item">{skill}</div>
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
                    <button>Follow</button>
                  </div>
                  <div className="btn_others">
                    <button>Block</button>
                  </div>
                  <div className="btn_others">
                    <button>Message</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
      <RightBar />
    </div>
  );
}
export default Search;
