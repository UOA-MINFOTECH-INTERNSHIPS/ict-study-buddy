import "./morePopper.scss";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
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

function MorePopper({ moreOpen, anchorEl, placement, postId }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      const res = await makeRequest.delete(`/post/${postId}`);
      return res.data;
    } catch (error) {
      console.error(err);
    }
  };

  const queryClient = useQueryClient();

  // UseMutation for delete a post with success callback to invalidate queries and reset state.
  const mutation = useMutation(handleDeletePost, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["Posts"]);
      setDeleteDialogOpen(false);
    },
  });

  // Function to handle the post delete process.
  const handleDeleteDialog = async () => {
    mutation.mutate();
  };

  return (
    <Popper
      open={moreOpen}
      anchorEl={anchorEl}
      placement={placement}
      transition
      className="popper"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className="container">
            <Button startIcon={<EditIcon />} className="item">
              Edit
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              className="item"
              onClick={handleDeleteDialogOpen}
            >
              Delete
            </Button>
            <Dialog
              open={deleteDialogOpen}
              onClose={handleDeleteDialogClose}
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
                <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                <Button onClick={handleDeleteDialog} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

export default MorePopper;
