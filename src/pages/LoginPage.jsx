import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Auth } from "../services/http";
import { Link as RouterLink, useLocation, Navigate } from "react-router-dom";
import { AppLocalStore } from "../utils/app-local-store";
import { selectUser, setUser } from "../reducers/current-user-slice";
import { useSelector, useDispatch } from "react-redux";

export const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const location = useLocation();
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    const isValid = ["email", "password"].every((field) => !!formValues[field]);

    if (isValid) {
      setLoading(true);

      Auth.signIn(formValues)
        .then((res) => {
          setLoading(false);
          if (res.data?.data?.token) {
            AppLocalStore.setToken(res.data.data.token);
            dispatch(setUser(res.data.data.user));
          }
        })
        .catch(() => setLoading(false));
    }
  };

  return userState.isLoggedIn ? (
    <Navigate to={from} />
  ) : (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                id="email"
                onChange={handleChange}
                value={formValues.email}
                error={isSubmitted && !formValues.email}
                autoComplete="email"
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
                onChange={handleChange}
                value={formValues.password}
                error={isSubmitted && !formValues.password}
                autoComplete="new-password"
                disabled={isLoading}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register">
                You haven't an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const defaultFormValues = {
  email: "",
  password: "",
};
