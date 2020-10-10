import React from "react";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";

import {
  IconButton,
  Grid,
  CardMedia,
  AppBar,
  Toolbar,
  Card,
  Typography,
  Box,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingData from "../components/Loading/loading.json";
import * as successData from "../components/Loading/sucess.json";
import * as emptyData from "../components/Loading/empty.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: successData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions3 = {
  loop: false,
  autoplay: true,
  animationData: emptyData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Kanit",
    justifyContent: "center",
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
    padding: "2rem",
    justifyContent: "center",
    minWidth: "300px",
    minHeight: "600px",
    textAlign: "center",
  },
  CardBTN: {
    padding: "40px",
    width: "350px",
    height: "auto",
    borderRadius: "20px",

    margin: "20px",
  },
  text: {
    padding: "10px",
    fontFamily: "Kanit",
    textDecoration: "none",
  },
  Button: {
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    color: "white",
    width: "auto",
    borderRadius: 5,
  },
  head: {
    margin: "5px",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    color: "white",
    width: "80px",
    textAlign: "center",
    padding: "2px",
    borderRadius: 30,
  },
}));

function Track() {
  const classes = useStyles();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let id = query.get("id");

  const [works, setWorks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const baseURL = "https://jkrjangsom.herokuapp.com";
  React.useEffect(() => {
    const fetchData = async () => {
      await axios(baseURL + "/api/track?id=" + id)
        .then((res) => {
          setLoading(true);
          console.log(res.data.works);
          setWorks(res.data.works);
          setTimeout(() => {
            setSuccess(true);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setTimeout(() => {
      fetchData();
    }, 1500);
  }, [id]);

  const handleBack = () => {
    window.location = "/";
  };
  const status_color = (work) => {
    let style = {};
    if (work === "แล้วเสร็จ") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(102,255,102)",
        borderRadius: "20px",
      };
    }
    if (work === "รอดำเนินการ") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(255,2,102)",
        borderRadius: "20px",
      };
    }
    if (work === "รออะไหล่") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(255,200,15)",
        borderRadius: "20px",
      };
    }
    return style;
  };
  return (
    <div className="App">
      <AppBar position="static" className={classes.bar}>
        <img
          onClick={() => (window.location = "/")}
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
        {!success ? (
          <FadeIn>
            <div>
              {!loading ? (
                <div>
                  <Box display="flex" justifyContent="center">
                    <h1
                      style={{
                        fontFamily: "Kanit",
                        textAlign: "center",
                      }}
                    >
                      กำลังโหลด
                    </h1>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Lottie options={defaultOptions} height={240} width={240} />
                  </Box>
                </div>
              ) : (
                <Box display="flex" justifyContent="center">
                  <Lottie options={defaultOptions2} height={240} width={240} />
                </Box>
              )}
            </div>
          </FadeIn>
        ) : (
          <div>
            {works.length === 0 ? (
              <div>
                <Lottie options={defaultOptions3} height={240} width={240} />
                <p
                  style={{
                    fontFamily: "Kanit",
                    textDecoration: "none",
                    fontSize: "50px",
                    color: "black",
                  }}
                >
                  ไม่มีรายการแจ้งซ่อม
                </p>
              </div>
            ) : (
              works.map((work, idx) => (
                <Grid container spacing={1}>
                  <Grid item xs={6} spacing={3}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      className={classes.CardBTN}
                      key={idx}
                      style={{ marginTop: "10px" }}
                    >
                      <Typography className={classes.head}>
                        No.{idx + 1}
                      </Typography>
                      <CardMedia
                        component="img"
                        alt="Thumbnail"
                        height="70px"
                        width="70px"
                        image={
                          work.hasOwnProperty("Image")
                            ? work.Image.Url
                            : "https://res.cloudinary.com/image-chatbot/image/upload/v1600499727/sws_fix/no-image_iysxah.jpg"
                        }
                      ></CardMedia>
                      <CardMedia>
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
                          ผู้เเจ้ง : {work.WorkInfo.Name}
                        </Typography>

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
                          แผนกที่แจ้งซ่อม : {work.WorkInfo.RoomCode}
                          {work.WorkInfo.RoomNumber}
                        </Typography>

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
                          ประเภทงานซ่อม : {work.WorkInfo.work}
                        </Typography>
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
                          อาการเสีย : {work.WorkInfo.Discription}
                        </Typography>
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
                          วันที่แจ้ง : {work.Date}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h8"
                          component="h4"
                          className={classes.text}
                          style={status_color(work.WorkInfo.Status)}
                        >
                          สถานะ : {work.WorkInfo.Status}
                        </Typography>
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
                          คำอธิบายการซ่อม : <br></br>
                          {work.WorkInfo.FixDetail}
                        </Typography>
                      </CardMedia>
                    </Card>
                  </Grid>
                </Grid>
              ))
            )}
          </div>
        )}
      </Card>
      <Footer />
    </div>
  );
}

export default Track;
