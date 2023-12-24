import React from "react";
import { connect } from "react-redux";
import { fetchAllOfficers, deleteOfficer } from "../../reducers/officers-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NewOfficer } from "./NewOfficer";
import { Link as RouterLink } from "react-router-dom";
import { ConfirmRemove } from "../../components/ConfirmRemove";

class OfficerListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toRemove: null };
  }

  componentDidMount() {
    this.props.fetchOfficers();
  }

  componentWillUnmount() {}

  confirmRemove = (id) => {
    this.setState({ toRemove: id });
  };

  handleClose = () => {
    this.setState({ toRemove: null });
  };

  handleRemove = (id) => {
    this.props.removeOfficer(id).then(() => {
      this.setState({ toRemove: null });
    });
  };

  render() {
    return (
      <Container>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h5">
            Responsible employees
          </Typography>
          <NewOfficer />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.officers.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">
                      {row.approved ? "Approved" : "Not approved"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        component={RouterLink}
                        to={"/officers/" + row._id}
                        variant="outlined"
                        size="small"
                      >
                        Edit
                      </Button>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => this.confirmRemove(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ConfirmRemove
          {...{
            handleClose: this.handleClose,
            handleRemove: this.handleRemove,
            id: this.state.toRemove,
            isLoading: this.props.isProcessing,
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    officers: state.officers.data,
    isLoading: state.officers.isLoading,
    isProcessing: state.officers.isProcessing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOfficers: () => dispatch(fetchAllOfficers()),
    removeOfficer: (id) => dispatch(deleteOfficer(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerListPage);
