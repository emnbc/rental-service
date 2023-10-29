import { CaseForm } from "../components/CaseForm";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCases, updateCase } from "../reducers/cases-slice";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Cases } from "../services/http";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export const CasePage = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const casesState = useSelector(selectCases);
  const dispatch = useDispatch();
  const { caseId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(updateCase(formValues)).then(() => {
      setIsBlocked(true);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    Cases.getCase(caseId).then((res) => {
      const { createdAt, updatedAt, __v, ...others } = res.data.data;
      setFormValues(others);
      setIsLoading(false);
    });
  }, [caseId]);

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
          Сообщение о кражах
        </Typography>
      </Box>
      <CaseForm
        {...{
          formValues,
          setFormValues,
          isSubmitted,
          isFormBlocked: casesState.isProcessing || isBlocked,
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
              disabled={casesState.isProcessing}
            >
              {casesState.isProcessing ? "Сохранение..." : "Сохранить"}
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
  _id: "",
  licenseNumber: "",
  ownerFullName: "",
  type: "",
  officer: "",
  clientId: "",
  color: "",
  date: "",
  description: "",
  resolution: "",
  status: "",
};
