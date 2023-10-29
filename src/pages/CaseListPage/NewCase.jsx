import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CaseForm } from "../../components/CaseForm";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCases, createCase } from "../../reducers/cases-slice";

export const NewCase = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const casesState = useSelector(selectCases);
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

    const isValid = ["licenseNumber", "ownerFullName", "type"].every(
      (field) => !!formValues[field]
    );

    if (isValid) {
      dispatch(createCase(formValues)).then(() => {
        handleClose();
      });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Сообщить о краже
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Сообщение о краже</DialogTitle>
        <DialogContent>
          <CaseForm
            {...{
              formValues,
              setFormValues,
              isSubmitted,
              isFormBlocked: casesState.isProcessing,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            autoFocus
            disabled={casesState.isProcessing}
          >
            {casesState.isProcessing ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const defaultFormValues = {
  licenseNumber: "",
  ownerFullName: "",
  type: "",
  officer: "",
  clientId: "",
  color: "",
  date: "",
  description: "",
};
