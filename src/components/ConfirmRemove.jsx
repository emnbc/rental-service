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
      <DialogTitle>Удаление</DialogTitle>
      <DialogContent>Вы уверены, что хотите удалить запись?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus disabled={isLoading}>
          Отмена
        </Button>
        <Button onClick={() => handleRemove(id)} disabled={isLoading}>
          {isLoading ? 'Удаление...' : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
