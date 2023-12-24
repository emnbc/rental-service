import AppBar from "@mui/material/AppBar";
import BikeScooter from "@mui/icons-material/BikeScooter";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { selectUser, reset } from "../../reducers/current-user-slice";
import { useSelector, useDispatch } from "react-redux";
import { AppLocalStore } from "../../utils/app-local-store";

export const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();

  const logOut = () => {
    AppLocalStore.setToken("");
    dispatch(reset());
  };

  const navBar = (
    <nav>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Link
          component={RouterLink}
          variant="button"
          color="inherit"
          to="/cases"
        >
          Theft reports
        </Link>
        <Link
          component={RouterLink}
          variant="button"
          color="inherit"
          to="/officers"
        >
          Employees
        </Link>
      </Box>
    </nav>
  );

  const logInButton = (
    <Box>
      <Button color="inherit" onClick={() => navigate("/login")}>
        Sign In
      </Button>
      <Button color="inherit" onClick={() => navigate("/register")}>
        Register
      </Button>
    </Box>
  );

  const logOutButton = (
    <Button color="inherit" onClick={logOut}>
      Sign Out
    </Button>
  );

  return (
    <AppBar position="relative">
      <Container disableGutters maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BikeScooter sx={{ mr: 2 }} />
            <Typography
              sx={{ cursor: "pointer" }}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              onClick={() => navigate("/")}
            >
              Bike Rental Service
            </Typography>
          </Box>
          {userState.isLoggedIn && navBar}
          {userState.isLoggedIn ? logOutButton : logInButton}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
