import React from "react";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { orange } from "@material-ui/core/colors";
import {
  Collapse,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Grid,
  AppBar,
  Toolbar,
  Card,
  Box,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import HomeIcon from "@material-ui/icons/Home";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Kanit",
    justifyContent: "center",

    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
  },
  Button: {
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",

    fontFamily: "Kanit",

    color: "white",

    borderRadius: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: "Kanit",
    flexGrow: 1,
    textDecoration: "none",
  },
  bar: {
    fontFamily: "Kanit",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
  },

  Card: {
    margin: "5px",
    width: "auto",
  },
  CardTrack: {
    padding: "50px",
    borderRadius: "30px",
    margin: "5px",
    width: "450px",
  },
  CardBTN: {
    width: "280px",
    height: "235px",
    borderRadius: "20px",
    marginTop: "20px",
    margin: "10px",
    textDecoration: "none",
  },
  text: {
    padding: "10px",
    fontFamily: "Kanit",
    textDecoration: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  CardLogin: {
    padding: "50px",
    borderRadius: "30px",
    margin: "5px",
    width: "450px",
  },
  buttonProgress: {
    color: orange[50],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function Admin(props) {
  const classes = useStyles();
  const [userInput, setUserInput] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const handleBack = () => {
    window.location = "/";
  };
  function Login(e) {
    e.preventDefault();
    // console.log(JSON.stringify(userInput));
    const baseURL = "https://sws-mantainance.herokuapp.com";

    const fetchData = async () => {
      await axios
        .post(baseURL + "/api/login", userInput)
        .then((response) => {
          setLoading(true);
          setTimeout(() => {
            let res = response.data;
            console.log(res.error);
            if (res.message.value !== "") {
              localStorage.setItem("loginToken", response.data);
              setLoading(false);
              window.location = "/dashboard";
            } else if (res.message.value === "error") {
              setErrMsg(res.message.error);
              setOpen(true);
              setLoading(false);
            }
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }

  return (
    <div className="App">
      <AppBar position="static" className={classes.bar}>
        <img
          alt="icon"
          width="64px"
          style={{
            borderRadius: "50px",
            margin: "8px",
            alignSelf: "center",
          }}
          src="data:image/jpeg;base64,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"
        />
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ระบบแจ้งซ่อมสำหรับหอพักนักเรียน โรงเรียนสุรวิวัฒน์
          </Typography>
          <IconButton onClick={handleBack}>
            <HomeIcon
              style={{
                color: "white",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Card className={classes.Card}>
        <Box display="flex" justifyContent="center">
          <Card className={classes.CardLogin}>
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="error"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {errMsg}
              </Alert>
            </Collapse>

            <form onSubmit={Login}>
              <Grid container justify="center">
                <Grid item xs={7}>
                  <Typography style={{ marginBottom: "10px" }}>
                    Login
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    value={userInput.email}
                    placeholder="Email"
                    style={{ marginBottom: "10px", width: "320px" }}
                    onChange={(e) => {
                      setUserInput({ ...userInput, email: e.target.value });
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    id="standard-basic"
                    label="Password"
                    value={userInput.password}
                    placeholder="Password"
                    style={{
                      marginBottom: "20px",
                      color: "orange",
                      width: "320px",
                    }}
                    onChange={(e) => {
                      setUserInput({ ...userInput, password: e.target.value });
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={7}>
                  <Button className={classes.Button} type="submit">
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
      </Card>
      <Footer />
    </div>
  );
}

export default Admin;
