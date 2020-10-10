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
    const baseURL = "https://jkrjangsom.herokuapp.com";

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
          src="https://pbs.twimg.com/profile_images/1423382599/LogoCkr_160_400x400.png"
      />
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          ระบบแจ้งซ่อมโรงพยาบาลจักราช
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
