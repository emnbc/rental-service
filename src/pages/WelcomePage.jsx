import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Cases } from "../services/http";
import { useSelector } from "react-redux";
import { selectUser } from "../reducers/current-user-slice";
import { Navigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const WelcomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const userState = useSelector(selectUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleChangeDate = (e) => {
    setFormValues({
      ...formValues,
      date: dayjs(e).isValid() ? dayjs(e).toISOString() : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    const isValid = [
      "licenseNumber",
      "ownerFullName",
      "type",
      "clientId",
    ].every((field) => !!formValues[field]);

    if (isValid) {
      setLoading(true);
      Cases.publicReport(formValues)
        .then(() => {
          setLoading(false);
          setFormValues(defaultFormValues);
          setIsSubmitted(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return userState.isLoggedIn ? (
    <Navigate to="/cases" replace />
  ) : (
    <Container>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h2" variant="h5">
          Theft report
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          <Typography>
            Welcome to the bike rental service. By filling out the form below,
            you will be able to inform us about the theft of the bike. If you
            are an employee, you you can log in to the service as an employee or
            register.
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="License number"
                name="licenseNumber"
                id="licenseNumber"
                onChange={handleChange}
                value={formValues.licenseNumber}
                error={isSubmitted && !formValues.licenseNumber}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="ownerFullName"
                id="ownerFullName"
                label="Owner Full Name"
                onChange={handleChange}
                value={formValues.ownerFullName}
                error={isSubmitted && !formValues.ownerFullName}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth>
                <InputLabel id="type">Bike Type</InputLabel>
                <Select
                  name="type"
                  id="type"
                  value={formValues.type}
                  error={isSubmitted && !formValues.type}
                  label="Bike Type"
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <MenuItem value={"general"}>General</MenuItem>
                  <MenuItem value={"sport"}>Sport</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="clientId"
                id="clientId"
                label="Unique number - clientId"
                onChange={handleChange}
                value={formValues.clientId}
                error={isSubmitted && !formValues.clientId}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                id="color"
                onChange={handleChange}
                value={formValues.color}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                name="date"
                id="date"
                label="Date of theft"
                onChange={handleChangeDate}
                value={formValues.date ? dayjs(formValues.date) : null}
                disabled={isLoading}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                id="description"
                label="Additional comment"
                onChange={handleChange}
                value={formValues.description}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Loading..." : "Send"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const defaultFormValues = {
  licenseNumber: "",
  ownerFullName: "",
  type: "",
  clientId: "",
  color: "",
  date: "",
  description: "",
};
