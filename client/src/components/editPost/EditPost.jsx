import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TagIcon from "@mui/icons-material/Tag";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

import SimpleDialog from "../tags/Tag";

import { useState } from "react";

function EditPost({ handleEditDialogOpen, post }) {
  const [updatedDesc, setUpdatedDesc] = useState({ desc: post.desc });
  const [updatedFile, setUpdatedFile] = useState({ file: post.file }); // Initialize the uploaded file to null.
  const [open, setOpen] = useState(false); // Set the Add Tags feature status to closed by default.
  const [selectedTags, setSelectedTags] = useState(post.tags); // Initialize selectedTags to null.

  // Function to open the tags dialog.
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Function to close the tags dialog and set the selectedTags.
  const handleClose = (value) => {
    setOpen(false);
    setSelectedTags(value);
  };

  const handleChange = (e) => {
    setUpdatedDesc(e.target.value);
  };

  // Function to upload a file using FormData.
  const upload = async (formData) => {
    try {
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // Function to create a new post.
  const createPost = async () => {
    const formData = new FormData();
    formData.append("file", updatedFile);
    let fileData = "";
    if (updatedFile) {
      fileData = await upload(formData);
    }
    // Create a new post with description, tags, and file.
    const newPost = {
      desc: updatedDesc,
      tags: selectedTags,
      file: fileData,
    }; //Create a newPost based the content, tags, file
    const response = await makeRequest.put(`/post/${post._id}`, newPost);
    return response.data;
  };

  const queryClient = useQueryClient();

  // UseMutation for creating a post with success callback to invalidate queries and reset state.
  const mutation = useMutation(createPost, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["Posts"]);
      setUpdatedDesc("");
      setUpdatedFile(null);
      setSelectedTags("");
      handleEditDialogOpen();
    },
  });

  // Function to handle the post creation process.
  const handlePost = async () => {
    mutation.mutate();
  };

  return (
    <div className="edit">
      <div className="modal">
        <div className="content">
          <button onClick={handleEditDialogOpen} className="close-button">
            &times;
          </button>
          <h2>Edit the post</h2>
          <input
            type="text"
            value={updatedDesc.desc}
            name="desc"
            onChange={handleChange}
          />
          {selectedTags ? (
            <label>
              <TagIcon />
              <span>{selectedTags}</span>
            </label>
          ) : null}
          {updatedFile ? (
            <label>
              <TextSnippetIcon />
              <span>{updatedFile.name}</span>
            </label>
          ) : null}
        </div>
        <div className="attachment">
          <div className="left">
            <div className="item">
              <div className="tag">
                <br />
                <input type="button" id="tags" onClick={handleClickOpen} />
                <label htmlFor="tags">
                  <TagIcon />
                  <span htmlFor="tags">Add Tags</span>
                </label>
                <SimpleDialog
                  selectedTags={selectedTags}
                  open={open}
                  onClose={handleClose}
                />
              </div>
            </div>
            <div className="item">
              <input
                type="file"
                id="file"
                onChange={(e) => setUpdatedFile(e.target.files[0])}
              />
              <label htmlFor="file">
                <InsertPhotoIcon />
                <span htmlFor="file">Add File</span>
              </label>
            </div>
          </div>
          <div className="right">
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
