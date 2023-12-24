import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export const ConfirmRemove = (props) => {
  const { handleClose, id, handleRemove, isLoading } = props;
  return (
    <Dialog
      open={!!id}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Remove</DialogTitle>
      <DialogContent>Are you sure you want to remove this item?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={() => handleRemove(id)} disabled={isLoading}>
          {isLoading ? "Removing..." : "Remove"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
