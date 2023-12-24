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
              label="License number"
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
              label="Full Name"
              onChange={handleChange}
              value={formValues.ownerFullName || ""}
              error={isSubmitted && !formValues.ownerFullName}
              disabled={isFormBlocked}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel id="type">Bike Type</InputLabel>
              <Select
                name="type"
                id="type"
                value={formValues.type || ""}
                error={isSubmitted && !formValues.type}
                label="Bike Type"
                onChange={handleChange}
                disabled={isFormBlocked}
              >
                <MenuItem value={"general"}>General</MenuItem>
                <MenuItem value={"sport"}>Sport</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="officer">Responsible employee</InputLabel>
              <Select
                name="officer"
                id="officer"
                value={formValues.officer || ""}
                error={isSubmitted && !formValues.officer}
                label="Responsible employee"
                onChange={handleChange}
                disabled={isFormBlocked}
              >
                <MenuItem value="">Not set</MenuItem>
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
              label="Color"
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
              label="Date of theft"
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
              label="Additional comment"
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
                label="Result comment"
                onChange={handleChange}
                value={formValues.resolution || ""}
                disabled={isFormBlocked}
              />
            </Grid>
          )}
          {formValues._id && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  name="status"
                  id="status"
                  value={formValues.status || ""}
                  label="Status"
                  onChange={handleChange}
                  disabled={isFormBlocked}
                >
                  <MenuItem value={"new"}>New</MenuItem>
                  <MenuItem value={"in_progress"}>In progress</MenuItem>
                  <MenuItem value={"done"}>Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};
