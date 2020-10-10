import React from "react";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  Grid,
  Toolbar,
  Typography,
  CardMedia,
  AppBar,
  IconButton,
  InputLabel,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Kanit",
    justifyContent: "center",
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
    marginLeft: "40px",
    width: "280px",
    height: "235px",
    borderRadius: "20px",
    marginTop: "20px",
    textDecoration: "none",
    marginBottom: "20px",
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
}));

function Home(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [trackLink, settrackLink] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    settrackLink("/tracking?id=" + e.target.value);
  };
  const handleAdmin = () => {
    history.push("/dashboard");
  };
  const handleSearch = () => {
    history.push(trackLink);
  };

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
            ระบบแจ้งซ่อม โรงพยาบาลจักราช
          </Typography>
          <IconButton onClick={handleAdmin}>
            <AccountCircleIcon
              style={{
                color: "white",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box display="flex" justifyContent="center">
        <Card className={classes.Card}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Card className={classes.CardBTN}>
                  <CardMedia
                    component="img"
                    alt="Thub"
                    height="150"
                    image="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  ></CardMedia>
                  <CardMedia>
                    <Link to="/maintenance">
                      <Typography
                        gutterBottom
                        variant="h8"
                        component="h4"
                        className={classes.text}
                        style={{
                          fontFamily: "Kanit",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        แจ้งซ่อม (Maintenance request)
                      </Typography>
                    </Link>
                  </CardMedia>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Card className={classes.CardBTN}>
                  <CardMedia
                    component="img"
                    alt="Thub"
                    height="150"
                    image="https://images.unsplash.com/photo-1509255502519-c134189a24a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  ></CardMedia>
                  <CardMedia>
                    <Typography className={classes.text} onClick={handleOpen}>
                      ติดตามสถานะการซ่อม (Status)
                    </Typography>
                  </CardMedia>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Footer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes.CardTrack}>
            <Typography className={classes.text}>
              ติดตามสถานะการซ่อม (Status)
            </Typography>
            <InputLabel
              style={{
                marginTop: "45px",
                fontFamily: "Kanit",
                color: "red",
              }}
              id="demo-simple-select-label"
            >
              ** กรุณากรอกชื่อผู้แจ้งซ่อม 
            </InputLabel>
            <TextField
              id="filled-basic"
              variant="filled"
              onChange={handleChange}
              style={{ width: "250px", borderRadius: "20px", margin: "5px" }}
              label="กรุณากรอกชื่อผู้แจ้งซ่อม"
            />
            <Button className={classes.Button} onClick={handleSearch}>
              ค้นหา
            </Button>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}

export default Home;
