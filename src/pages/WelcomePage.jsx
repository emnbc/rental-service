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
          Сообщение о краже
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          <Typography>
            Добро пожаловать на сервис проката велосипедов. Заполнив форму ниже,
            вы сможете сообщить нам о краже велосипеда. Если вы сотрудник, вы
            можете войти в сервис как сотрудник или зарегистрироваться.
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
                label="Номер лицензии"
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
                label="ФИО арендатора"
                onChange={handleChange}
                value={formValues.ownerFullName}
                error={isSubmitted && !formValues.ownerFullName}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth>
                <InputLabel id="type">Тип велосипеда</InputLabel>
                <Select
                  name="type"
                  id="type"
                  value={formValues.type}
                  error={isSubmitted && !formValues.type}
                  label="Тип велосипеда"
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <MenuItem value={"general"}>Обычный</MenuItem>
                  <MenuItem value={"sport"}>Спортивный</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="clientId"
                id="clientId"
                label="Уникальный номер - clientId"
                onChange={handleChange}
                value={formValues.clientId}
                error={isSubmitted && !formValues.clientId}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Цвет велосипеда"
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
                label="Дата кражи"
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
                label="Дополнительный комментарий"
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
            {isLoading ? "Загрузка..." : "Отправить"}
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
