import "./morePopover.scss";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import EditPost from "../editPost/EditPost";

function MorePopover({ postId, post, handleMoreOpen }) {
  const [optionOpen, setOptionOpen] = useState(true); // State to control whether options are open or closed
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control the delete dialog visibility
  const [editDialogOpne, setEditDialogOpen] = useState(false); // State to control the edit dialog visibility

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
    setOptionOpen(!optionOpen); // Close the options menu when the delete dialog is opened
  };

  const handleEditDialogOpen = () => {
    setEditDialogOpen(!editDialogOpne);
    setOptionOpen(!optionOpen); // Close the options menu when the edit dialog is opened
  };

  const handleDeletePost = async () => {
    try {
      const res = await makeRequest.delete(`/post/${postId}`);
      return res.data;
    } catch (error) {
      console.error(error); // Log the error if the delete request fails
    }
  };

  const queryClient = useQueryClient();

  // UseMutation for deleting a post with success callback to invalidate queries and reset state.
  const mutation = useMutation(handleDeletePost, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["Posts"]); // Invalidate the "Posts" query to reflect the post deletion
      setDeleteDialogOpen(false); // Close the delete dialog after successful deletion
    },
  });

  // Function to handle the post delete process.
  const handleDeleteDialog = async () => {
    mutation.mutate(); // Trigger the delete post mutation
  };

  return (
    <div className="popover">
      <div className="wrapper">
        {optionOpen && (
          <div className="container">
            <button onClick={handleMoreOpen} className="close-button">
              &times;
            </button>
            <button className="btn" onClick={handleEditDialogOpen}>
              <EditIcon />
              <span>Edit</span>
            </button>
            <button className="btn" onClick={handleDeleteDialogOpen}>
              <DeleteIcon />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be canceled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogOpen}>Cancel</Button>
          <Button onClick={handleDeleteDialog} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {editDialogOpne && (
        <EditPost
          handleEditDialogOpen={handleEditDialogOpen}
          handleMoreOpen={handleMoreOpen}
          post={post}
        />
      )}
    </div>
  );
}

export default MorePopover;
