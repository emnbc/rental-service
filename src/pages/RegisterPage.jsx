import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Auth } from "../services/http";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export const RegisterPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const navigate = useNavigate();

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
    const isValid = ["email", "password", "clientId"].every(
      (field) => !!formValues[field]
    );

    if (isValid) {
      setLoading(true);

      Auth.signUp(formValues)
        .then(() => {
          setLoading(false);
          navigate("/login");
        })
        .catch(() => setLoading(false));
    }
  };

  return (
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
          Registration
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
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
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={formValues.password}
                error={isSubmitted && !formValues.password}
                autoComplete="new-password"
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="clientId"
                label="Client Id"
                type="text"
                id="clientId"
                onChange={handleChange}
                value={formValues.clientId}
                error={isSubmitted && !formValues.clientId}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                value={formValues.firstName}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={formValues.lastName}
                autoComplete="family-name"
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
            {isLoading ? "Registration..." : "Register"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login">
                Already have an account? Sign In
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
  clientId: "",
  firstName: "",
  lastName: "",
};
