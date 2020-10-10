import React from "react";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { orange } from "@material-ui/core/colors";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Select,
  AppBar,
  Toolbar,
  Typography,
  CardMedia,
  Card,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as successData from "../components/Loading/sucess.json";

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: successData.default,
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
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  textbox: {
    color: orange[500],
  },
  buttonProgress: {
    color: orange[50],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: orange[50],
    "&:hover": {
      backgroundColor: orange[70],
    },
  },
  title: {
    fontFamily: "Kanit",
    flexGrow: 1,
  },
  bar: {
    fontFamily: "Kanit",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
  },
  Card: {
    padding: "40px",

    margin: "5px",
    width: "auto",
  },
  CardBTN: {
    width: "500px",
    padding: "10px",
    height: "auto",
    borderRadius: "20px",
    marginTop: "20px",
  },
  text: {
    padding: "10px",
    fontFamily: "Kanit",
    textDecoration: "none",
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    padding: "20px",
  },

  Button: {
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",

    fontFamily: "Kanit",

    color: "white",
    margin: "5px",
    borderRadius: 5,
  },
  input: {
    display: "none",
  },
}));

function Request() {
  const classes = useStyles();

  const [info, setInfo] = React.useState({
    repair_user: "",
    department: "",
    com_problems_type: "",
    repair_list: "",
    repair_detail: "",
    status_repair: "รอดำเนินการ",
    repair_cause: "",
  });

  const [works, setWorks] = React.useState({
    Image: [],
    WorkInfo: "",
    Date: "",
  });

  const baseURL = "https://jkrjangsom.herokuapp.com";

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  function handleLoading() {
    setLoading(true);
  }

  const [files, setFiles] = React.useState([]);
  // onChange function that reads files on uploading them
  // files read are encoded as Base64

  function generateUUID() {
    // Public Domain/MIT
    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = Math.random() * 16; //random number between 0 and 16
      
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  function onFileUpload(event) {
    event.preventDefault();
    // Create an instance of FileReader API
    let file_reader = new FileReader();
    var today = new Date();
    // Get the actual file itself
    let file = event.target.files[0];
    
    file_reader.onload = () => {
      // After uploading the file
      // appending the file to our state array
      // set the object keys and values accordingly
      setFiles([
        ...files,
        { file_id: info.repair_user+today, uploaded_file: file_reader.result },
      ]);
    };
    // reading the actual uploaded file
    file_reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    var today = new Date();

    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const result = today.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    var dateTime = result + " เวลา " + time;

    setWorks({
      ...works,
      Image: files,
      WorkInfo: info,
      Date: dateTime,
    });
    // console.log(works);
    const fetchData = async () => {
      await axios
        .post(
          baseURL +
          "/api/request-mantainance?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoi4Lie4Lix4LiX4LiY4LiZ4Lix4LiZ4LiX4LmMIOC4meC4uOC5iOC4oeC4nOC5iOC4reC4hyIsIlN0dWRlbnRJZCI6NjEzMDYwMn0.CYbnwnSMfSkZZj0HL-92_VByS2chxh55YHji_LQTwOI",
          works
        )
        .then(
          (response) => {
            setTimeout(() => {
              setSuccess(true);
              setLoading(false);
            }, 1000);
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    fetchData();
  }

  const handleBack = () => {
    window.location = "/";
  };

  const listItems = files.map((f) => (
    <Grid item xs={12}>
      <Card
        style={{
          padding: "5px",
          margin: "10px",
          width: "110px",
        }}
      >
        <img
          alt="preview"
          key={f.file_id}
          src={f.uploaded_file.length === 0 ? "" : f.uploaded_file}
          width="100px"
        />
      </Card>
    </Grid>
  ));
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
        </Toolbar>
      </AppBar>
      {!success ? (
        <Card className={classes.Card}>
          <Button
            className={classes.Button}
            startIcon={<HomeIcon />}
            onClick={handleBack}
          >
            กลับ
          </Button>

          <Grid container justify="center">
            <Card className={classes.CardBTN}>
              <Grid container justify="center">
                <Grid item xs="auto">
                  <Typography
                    justify="center"
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{
                      fontFamily: "Kanit",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    แจ้งซ่อม
                  </Typography>
                </Grid>
              </Grid>

              <form
                className={classes.root}
                autoComplete="on"
                onSubmit={handleSubmit}
              >
                <Grid containe justsify="center">
                  <Grid xs={9}>
                    <TextField
                      name="repair_user"
                      id="standard-basic"
                      label="ชื่อ-นามสกุล"
                      value={info.repair_user}
                      variant="outlined"
                      className={classes.textbox}
                      onChange={handleChange}
                      style={{
                        marginTop: "45px",
                        fontFamily: "Kanit",
                        textDecoration: "none",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid lg={"auto"}>
                    <InputLabel
                      style={{
                        marginTop: "45px",
                        fontFamily: "Kanit",
                      }}
                      id="demo-simple-select-label"
                    >
                      ชื่อแผนกที่แจ้งซ่อม
                    </InputLabel>
                    <Select
                      name="department"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={info.department}
                      onChange={handleChange}
                    >
                      <MenuItem value={"OPD"}>OPD</MenuItem>
                      <MenuItem value={"ER"}>ER</MenuItem>
                      <MenuItem value={"ห้องบัตร"}>ห้องบัตร</MenuItem>
                      <MenuItem value={"ห้องยา"}>ห้องยา</MenuItem>
                    </Select>
                  </Grid>
                  {/* <Grid item lg={"auto"}>
                    <TextField
                      style={{
                        marginLeft: "45px",
                        marginTop: "45px",
                        fontFamily: "Kanit",
                      }}
                      variant="outlined"
                      name="RoomNumber"
                      id="standard-basic"
                      label="หมายเลขห้อง"
                      onChange={handleChange}
                    />
                  </Grid> */}
                </Grid>

                <InputLabel
                  style={{
                    marginTop: "60px",
                    fontFamily: "Kanit",
                  }}
                  id="demo-simple-select-label"
                >
                  ประเภทงาน
                </InputLabel>
                <Select
                  name="com_problems_type"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={info.com_problems_type}
                  onChange={handleChange}
                >
                  <MenuItem value={"1"}>งานติดตั้งแก้ไขโปรแกรมต่างๆ	Software</MenuItem>
                  <MenuItem value={"2"}>งานซ่อมแก้ไขปัญหาคอมพิวเตอร์	Hardware</MenuItem>
                  <MenuItem value={"3"}>งานระบบเครือข่าย	Network</MenuItem>
                  <MenuItem value={"4"}>งานแก้ไขปัญหา Internet ขัดข้อง	Internet</MenuItem>
                  <MenuItem value={"5"}>งานติดตั้งคอมพิวเตอร์ใหม่</MenuItem>
                  <MenuItem value={"6"}>งานซ่อมเครื่องปริ้นเตอร์</MenuItem>
                  <MenuItem value={"7"}>งานซ่อมเครื่องสำรอง</MenuItem>
                  <MenuItem value={"8"}>งานซ่อมอุปกรณ์ต่อพ่วง่(เม้าส์ คีย์บอร์ด อื่นๆ</MenuItem>
                  <MenuItem value={"9"}>งานบริการอื่นๆ </MenuItem>


                </Select>

                <Typography
                  style={{
                    marginTop: "45px",
                    fontFamily: "Kanit",
                  }}
                >
                  รูปประกอบ
                </Typography>
                <input
                  style={{ marginTop: "60px" }}
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={onFileUpload}
                  multiple="true"
                />
                <label htmlFor="icon-button-file" style={{ marginTop: "60px" }}>
                  <IconButton
                    style={{
                      color: "rgba(245,81,4,1)",
                    }}
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>

                <Grid container justsify="center">
                  <Grid
                    item
                    xs={12}
                    style={{
                      overflowX: "auto",
                      overflowY: "50px",
                      marginBottom: "10px",
                    }}
                  >
                    {listItems}
                  </Grid>

                  <Grid item xs={12}>
                    <TextareaAutosize
                      rowsMin={3}
                      rowsMax={3}
                      value={info.repair_detail}
                      name="repair_detail"
                      aria-label="maximum height"
                      placeholder="อธิบายอาการเสีย"
                      defaultValue=""
                      style={{
                        marginTop: "10px",
                        width: "210px",
                        padding: "5px",
                        fontFamily: "Kanit",
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <CardMedia
                  style={{ marginTop: "40px" }}
                  className={classes.wrapper}
                >
                  <Button
                    disabled={success}
                    className={classes.Button}
                    onClick={handleLoading}
                    type="submit"
                  >
                    <i
                      className="fas fa-paper-plane"
                      style={{ marginRight: "5px" }}
                    ></i>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                    เเจ้งซ่อม
                  </Button>
                </CardMedia>
              </form>
            </Card>
          </Grid>
        </Card>
      ) : (
          <FadeIn>
            <Lottie options={defaultOptions2} height={140} width={140} />
          </FadeIn>
        )}
      <Footer />
    </div>
  );
}

export default Request;
