import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { OfficerForm } from "../../components/OfficerForm";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOfficers, createOfficer } from "../../reducers/officers-slice";

export const NewOfficer = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const officersState = useSelector(selectOfficers);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setFormValues(defaultFormValues);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isValid = ["email", "password"].every((field) => !!formValues[field]);

    if (isValid) {
      dispatch(createOfficer(formValues)).then(() => {
        handleClose();
      });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Добавить сотрудника
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Добавление сотрудника</DialogTitle>
        <DialogContent>
          <OfficerForm
            {...{
              formValues,
              setFormValues,
              isSubmitted,
              isFormBlocked: officersState.isProcessing,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            autoFocus
            disabled={officersState.isProcessing}
          >
            {officersState.isProcessing
              ? "Сохранение..."
              : "Сохранить"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const defaultFormValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  approved: false,
};
