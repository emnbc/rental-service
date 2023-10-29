import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { Officers } from "../services/http";
import { useState, useEffect } from "react";

export const CaseForm = (props) => {
  const { formValues, setFormValues, isSubmitted, isFormBlocked, isLoading } =
    props;
  const [officerList, setOfficerList] = useState([]);

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

  useEffect(() => {
    Officers.fetch().then((res) => {
      setOfficerList(res.data?.officers?.filter((o) => o.approved));
    });
  }, []);

  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 3,
        width: "100%",
        marginTop: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Номер лицензии"
              name="licenseNumber"
              id="licenseNumber"
              onChange={handleChange}
              value={formValues.licenseNumber || ""}
              error={isSubmitted && !formValues.licenseNumber}
              disabled={isFormBlocked}
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
              value={formValues.ownerFullName || ""}
              error={isSubmitted && !formValues.ownerFullName}
              disabled={isFormBlocked}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel id="type">Тип велосипеда</InputLabel>
              <Select
                name="type"
                id="type"
                value={formValues.type || ""}
                error={isSubmitted && !formValues.type}
                label="Тип велосипеда"
                onChange={handleChange}
                disabled={isFormBlocked}
              >
                <MenuItem value={"general"}>Обычный</MenuItem>
                <MenuItem value={"sport"}>Спортивный</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="officer">Ответственный сотрудник</InputLabel>
              <Select
                name="officer"
                id="officer"
                value={formValues.officer || ""}
                error={isSubmitted && !formValues.officer}
                label="Ответственный сотрудник"
                onChange={handleChange}
                disabled={isFormBlocked}
              >
                <MenuItem value="">Не задан</MenuItem>
                {officerList.map((o) => (
                  <MenuItem key={o._id} value={o._id}>
                    {o.firstName} {o.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Цвет велосипеда"
              name="color"
              id="color"
              onChange={handleChange}
              value={formValues.color || ""}
              disabled={isFormBlocked}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              name="date"
              id="date"
              label="Дата кражи"
              onChange={handleChangeDate}
              value={formValues.date ? dayjs(formValues.date) : null}
              disabled={isFormBlocked}
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
              value={formValues.description || ""}
              disabled={isFormBlocked}
            />
          </Grid>
          {formValues._id && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="resolution"
                id="resolution"
                label="Завершающий комментарий"
                onChange={handleChange}
                value={formValues.resolution || ""}
                disabled={isFormBlocked}
              />
            </Grid>
          )}
          {formValues._id && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status">Статус</InputLabel>
                <Select
                  name="status"
                  id="status"
                  value={formValues.status || ""}
                  label="Статус"
                  onChange={handleChange}
                  disabled={isFormBlocked}
                >
                  <MenuItem value={"new"}>Новый</MenuItem>
                  <MenuItem value={"in_progress"}>В процессе</MenuItem>
                  <MenuItem value={"done"}>Завершен</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};
