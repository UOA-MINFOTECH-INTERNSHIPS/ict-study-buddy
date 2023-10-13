import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import MorePopover from "../morePopover/MorePopover";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

function Post({ post }) {
  // Get the public folder path
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  // Get the current user from context
  const { currentUser } = useContext(AuthContext);

  // State to track if the post is liked by the current user
  const [liked, setLiked] = useState(post.likes.includes(currentUser._id));
  // State to track the number of likes
  const [likesCount, setLikesCount] = useState(post.likes.length);

  // State to track if the comments section is open
  const [commentOpen, setCommentOpen] = useState(false);
  // State to track the number of comments
  const [commentsCount, setCommentsCount] = useState(post.comments.length);

  // State to control the visibility of the more options popover
  const [openMore, setOpenMore] = useState(false);

  // Function to handle the opening and closing of the more options popover
  const handleMoreOpen = () => {
    setOpenMore(!openMore);
  };

  // Function to handle the like/unlike action
  const handleLike = async () => {
    try {
      await makeRequest.put(`/post/${post._id}/like`);
      // Toggle the liked state and update the number of likes
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profile/${post.userInfos._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={post.userInfos.profilePic} alt="avatar" />
            </Link>
            <div className="details">
              <Link
                to={`/profile/${post.userInfos.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userInfos.userName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>

          {post.userInfos._id !== currentUser._id ? (
            <Button>
              <MoreHorizIcon style={{ color: "darkgrey" }} />
            </Button>
          ) : (
            <Button onClick={handleMoreOpen} autoFocus className="more">
              <MoreHorizIcon />
            </Button>
          )}

          {openMore && (
            <MorePopover
              postId={post._id}
              post={post}
              handleMoreOpen={handleMoreOpen}
            />
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.file ? (
            <div>
              <a
                href={`${post.file?.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="postFile"
              >
                <p>{post.file.name}</p>
                <DownloadIcon className="downloadBtn" />
              </a>
            </div>
          ) : null}

          {post.tags ? <p className="tags">#{post.tags}</p> : null}
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <FavoriteIcon style={{ color: "red" }} onClick={handleLike} />
            ) : (
              <FavoriteBorderIcon onClick={handleLike} />
            )}
            {likesCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentsCount} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && (
          <Comments
            postId={post._id}
            onCommentSubmitted={() => {
              setCommentsCount(commentsCount + 1);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
