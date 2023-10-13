import "./search.scss";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import Post from "../../components/post/Post";
import User from "../../components/usercard/Usercard";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/RightBar";

function Search() {
  const { result } = useContext(SearchContext);

  const { query } = useParams(); // Get the query parameter from the URL

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
            result.users.map((user, index) => <User user={user} key={index} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
      <RightBar />
    </div>
  );
}
export default Search;
