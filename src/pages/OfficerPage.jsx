import { OfficerForm } from "../components/OfficerForm";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOfficers, updateOfficer } from "../reducers/officers-slice";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Officers } from "../services/http";

export const OfficerPage = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const officersState = useSelector(selectOfficers);
  const dispatch = useDispatch();
  const { officerId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, ...others } = formValues;
    setIsSubmitted(true);
    dispatch(updateOfficer(others)).then(() => {
      setIsBlocked(true);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    Officers.getOfficer(officerId).then((res) => {
      const { clientId, __v, ...others } = res.data.data;
      setFormValues(others);
      setIsLoading(false);
    });
  }, [officerId]);

  return (
    <Container>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
        }}
      >
        <Typography component="h2" variant="h5">
          Ответственный сотрудник
        </Typography>
      </Box>
      <OfficerForm
        {...{
          formValues,
          setFormValues,
          isSubmitted,
          isFormBlocked: officersState.isProcessing || isBlocked,
          isLoading,
        }}
      />
      {!isLoading && (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "20px",
            height: "40px",
          }}
        >
          {!isBlocked && (
            <Button
              onClick={handleSubmit}
              autoFocus
              variant="contained"
              disabled={officersState.isProcessing}
            >
              {officersState.isProcessing ? "Сохранение..." : "Сохранить"}
            </Button>
          )}
          <Button
            onClick={() => setIsBlocked(isBlocked ? false : true)}
            autoFocus
          >
            {isBlocked ? "Редактировать" : "Отмена"}
          </Button>
        </Box>
      )}
    </Container>
  );
};

const defaultFormValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  approved: false,
};
