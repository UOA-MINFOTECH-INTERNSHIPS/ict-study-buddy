import { useContext } from "react";
import { useParams } from "react-router-dom";

import { SearchContext } from "../../context/searchContext";
import Post from "../../components/post/Post";

function Search() {
  const { result } = useContext(SearchContext);

  const { query } = useParams();

  return (
    <div>
      <p>Query: "{query}"</p>
      <p>Results:</p>
      <h1>Post</h1>
      {result && result.posts && result.posts.length > 0 ? (
        result.posts.map((post, index) => <Post post={post} key={index} />)
      ) : (
        <p>No posts found.</p>
      )}
      <h1>User</h1>
      <ul>
        {result && result.users && result.users.length > 0 ? (
          result.users.map((user, index) => (
            <li key={index}>
              <div>
                <p>{user.userName}</p>
                <p>{user.email}</p>
                <p>{user.desc}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}
export default Search;
