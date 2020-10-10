import React from "react";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
import "./swal_style.css";
import {
  Grid,
  CardMedia,
  Box,
  AppBar,
  Button,
  Toolbar,
  GridList,
  InputLabel,
  Card,
  Fade,
  Select,
  MenuItem,
  Modal,
  TextareaAutosize,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingData from "../components/Loading/loading.json";
import * as emptyData from "../components/Loading/empty.json";
import { orange } from "@material-ui/core/colors";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
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
  CardTrack: {
    padding: "50px",
    borderRadius: "30px",
    margin: "5px",
    width: "450px",
  },
  title: {
    fontFamily: "Kanit",
    flexGrow: 1,
    textDecoration: "none",
  },
  input: {
    color: "white",
  },
  bar: {
    fontFamily: "Kanit",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
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
  Card: {
    padding: "2rem",
    justifyContent: "center",
    textAlign: "center",
    height: "auto",
    overflow: "scroll",
  },
  CardBTN: {
    margin: "1rem",

    minWidth: "280px",
    maxHeight: "auto",

    borderRadius: "20px",
    // overflowY: "scroll",
  },

  Button: {
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    color: "white",
    width: "auto",
    borderRadius: 5,
  },
  ButtonEdit: {
    magin: "15px",
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
    width: "auto",
    textAlign: "center",
    padding: "2px",
    borderRadius: 30,
  },
  summaryCard: {
    marginTop: "10px",
    color: "white",
    width: "180px",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    height: "180px",
    padding: "1rem",
    borderRadius: 20,
  },
  buttonProgress: {
    color: orange[50],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  media: {
    height: 140,
  },
}));

function Dashboard() {
  const classes = useStyles();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  // Function นี้จะเป็นการเรียกใช้ Search paramiter

  let query = useQuery();
  // เรียกใช้ function ด้านบนในรูปย่อ
  let id = query.get("id");
  // กำหนดตัวเเปร id เพื่อรับค่าจาก query string ชื่อ id

  const [works, setWorks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [IsUpdated, setIsUpdated] = React.useState(false);
  const [objId, setobjId] = React.useState("");
  const [refId, setRefId] = React.useState("");
  const [update, setUpdate] = React.useState({ Status: "", Discription: "" });
  const [loading, setLoading] = React.useState(false);
  const [IsDel, setIsDel] = React.useState(false);
  const baseURL = "https://jkrjangsom.herokuapp.com";
  React.useEffect(() => {
    const fetchData = async () => {
      await axios(baseURL + "/api/get-allwork")
        .then((res) => {
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
  }, [id, IsUpdated, IsDel]);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    window.location = "/dashboard";
  };
  const handleOpen = (workID, refId) => {
    setobjId(workID);
    setRefId(refId);
    setOpen(true);
  };
  const handleOpen2 = (workID, refId) => {
    setobjId(workID);
    setRefId(refId);
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleChangeStatus = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      Id: objId,
      [e.target.name]: e.target.value,
      refId: refId,
    });
    // console.log(update);
  };
  const handleChangeDiscription = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      Id: objId,
      [e.target.name]: e.target.value,
      refId: refId,
    });
  };
  const status_color = (work) => {
    let style = {};
    if (work === "แล้วเสร็จ") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(102,200,102)",
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
    if (work === "มีค่าใช้จ่าย") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(245,81,4)",
        borderRadius: "20px",
      };
    }
    if (work === "ซ่อมไม่ได้") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(50,50,50)",
        borderRadius: "20px",
      };
    }
    return style;
  };
  function CoutWorks(works) {
    let summary = {
      all_work: 0,
      wait_parts: 0,
      pendding: 0,
      pay: 0,
      done: 0,
      cannot_fix: 0,
    };
    let all_work = 0;
    let pendding = 0;
    let wait_parts = 0;
    let pay = 0;
    let done = 0;
    let cannot_fix = 0;

    works.map((user) =>
      Object.entries(user).map((work) => {
        all_work += 1;
        if (work[1].WorkInfo.Status === "รอดำเนินการ") {
          pendding += 1;
        } else if (work[1].WorkInfo.Status === "มีค่าใช้จ่าย") {
          pay += 1;
        } else if (work[1].WorkInfo.Status === "รออะไหล่") {
          wait_parts += 1;
        } else if (work[1].WorkInfo.Status === "แล้วเสร็จ") {
          done += 1;
        } else if (work[1].WorkInfo.Status === "ซ่อมไม่ได้") {
          cannot_fix += 1;
        }
        return 0;
      })
    );
    summary = {
      all_work: all_work,
      wait_parts: wait_parts,
      pendding: pendding,
      pay: pay,
      done: done,
      cannot_fix: cannot_fix,
    };
    // console.log(summary);
    return summary;
  }
  function updateData() {
    const fetchData = async () => {
      await axios
        .post(
          baseURL +
            "/api/update?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoi4Lie4Lix4LiX4LiY4LiZ4Lix4LiZ4LiX4LmMIOC4meC4uOC5iOC4oeC4nOC5iOC4reC4hyIsIlN0dWRlbnRJZCI6NjEzMDYwMn0.CYbnwnSMfSkZZj0HL-92_VByS2chxh55YHji_LQTwOI",
          update
        )
        .then((res) => {
          setLoading(true);
          setIsUpdated(true);
          setTimeout(() => {
            setIsUpdated(false);
            setLoading(false);
            setOpen(false);
            setOpen2(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }
  function ProgressWithLabel() {
    return (
      <Box position="relative" display="inline-flex">
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: "30px" }}
        >
          <Typography
            variant="caption"
            component="div"
            color="white"
            style={{
              fontSize: "50px",
              fontFamily: "Kanit",
              textAlign: "center",
            }}
          >
            {`${Math.round(
              (CoutWorks(works).done / CoutWorks(works).all_work) * 100
            )}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  function confrimDel(Id, refId) {
    // console.log(Id, refId);
    Swal.fire({
      title:
        '<h1 style={{fontFamily: "Kanit",textAlign: "center"}}>แน่ใจนะว่าจะลบงานซ่อม</h1 >',
      html:
        '<h1 style={{fontFamily: "Kanit",textAlign: "center",}} >ไม่สามารถเรียกคืนได้นะ</h1>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ใช่, ลบเลย!",
    }).then((result) => {
      if (result.isConfirmed) {
        const delData = async () => {
          setLoading(true);
          setIsDel(true);
          await axios
            .post(
              baseURL +
                "/api/delete?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoi4Lie4Lix4LiX4LiY4LiZ4Lix4LiZ4LiX4LmMIOC4meC4uOC5iOC4oeC4nOC5iOC4reC4hyIsIlN0dWRlbnRJZCI6NjEzMDYwMn0.CYbnwnSMfSkZZj0HL-92_VByS2chxh55YHji_LQTwOI",
              { Id: Id, refId: refId }
            )
            .then((res) => {
              setTimeout(() => {
                Swal.fire("ลบสำเร็จ!", "", "success");
                setIsDel(false);
                setLoading(false);
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        delData();
      }
    });
  }
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

          <Button
            style={{
              padding: "1rem",
              color: "orange",
              background: "white",
              marginRight: "10px",
            }}
            onClick={() => {
              window.location = "/";
            }}
          >
            <i className="fas fa-home"></i>
            Home
          </Button>
          <Button
            style={{ padding: "1rem", color: "orange", background: "white" }}
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Card className={classes.Card}>
        {!success ? (
          <FadeIn>
            <div>
              <Box display="flex" justifyContent="center">
                <h1
                  style={{
                    fontFamily: "Kanit",
                    textAlign: "center",
                  }}
                >
                  กำลังโหลด...
                </h1>
              </Box>
              <Box display="flex" justifyContent="center">
                <Lottie options={defaultOptions} height={240} width={240} />
              </Box>
            </div>
          </FadeIn>
        ) : (
          <div>
            <Box display="flex" justifyContent="center">
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={1}
              >
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i
                      className="fas fa-check-circle"
                      style={{ height: "50px" }}
                    ></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    งานซ่อมแล้วเสร็จ
                  </Typography>
                  <ProgressWithLabel />
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-wrench" style={{ height: "50px" }}></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    งานซ่อมทั้งหมด<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).all_work}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-clock" style={{ height: "50px" }}></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    รออะไหล่<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).wait_parts}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-clock" style={{ height: "50px" }}></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    รอดำเนินการ<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).pendding}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i
                      className="fab fa-bitcoin"
                      style={{ height: "50px" }}
                    ></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    มีค่าใช้จ่าย<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).pay}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-times-circle"></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    ซ่อมไม่ได้<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).cannot_fix}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
              </Grid>
            </Box>
            <Box display="grid">
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
                works.map((user, idx) => (
                  <GridList
                    cellHeight={780}
                    cols={3}
                    style={{ marginTop: "50px" }}
                  >
                    {Object.entries(user).map((work, idx) => (
                      <Card style={{ width: "auto", overflowX: "scroll" }}>
                        <Card
                          className={classes.CardBTN}
                          key={idx}
                          style={{
                            padding: "1rem",
                            width: "320px",
                            height: "580px",
                            overflowY: "auto",
                          }}
                        >
                          <CardMedia>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.head}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                              }}
                            >
                              ผู้เเจ้ง : {work[1].WorkInfo.Name}
                            </Typography>
                            <Typography className={classes.head}>
                              No.{idx + 1}
                            </Typography>
                          </CardMedia>

                          <CardMedia
                            className={classes.media}
                            image={
                              work[1].hasOwnProperty("Image")
                                ? work[1].Image.Url
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
                              เลขประจำตัวนักเรียน : {work[1].WorkInfo.StudentId}
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
                              เลขห้องพัก : {work[1].WorkInfo.RoomCode}
                              {work[1].WorkInfo.RoomNumber}
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
                              รหัสอ้างอิง : #{work[0].slice(1, -1)}
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
                              ประเภทงานซ่อม : {work[1].WorkInfo.work}
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
                              อาการเสียที่แจ้ง : {work[1].WorkInfo.Discription}
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
                              วันที่แจ้ง : {work[1].Date}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={status_color(work[1].WorkInfo.Status)}
                            >
                              สถานะ : {work[1].WorkInfo.Status}
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                              <Button
                                onClick={() => {
                                  handleOpen(
                                    work[0],
                                    work[1].WorkInfo.RoomCode +
                                      work[1].WorkInfo.RoomNumber +
                                      work[1].WorkInfo.StudentId
                                  );
                                }}
                              >
                                <i
                                  className="fas fa-edit"
                                  style={{ marginLeft: "25px", color: "white" }}
                                ></i>
                              </Button>
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
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                              คำอธิบายการซ่อม : <br></br>
                              {work[1].WorkInfo.FixDetail === ""
                                ? "คลิกเพื่อออธิบายงานซ่อม"
                                : work[1].WorkInfo.FixDetail}
                              <Button
                                onClick={() => {
                                  handleOpen2(
                                    work[0],
                                    work[1].WorkInfo.RoomCode +
                                      work[1].WorkInfo.RoomNumber +
                                      work[1].WorkInfo.StudentId
                                  );
                                }}
                              >
                                <i
                                  className="fas fa-edit"
                                  style={{ marginLeft: "25px", color: "black" }}
                                ></i>
                              </Button>
                            </Typography>
                            <Button
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "rgb(255,255,255)",
                                backgroundColor: "rgb(255,20,102)",
                                borderRadius: "20px",
                              }}
                              onClick={() => {
                                confrimDel(
                                  work[0],

                                  work[1].WorkInfo.RoomCode +
                                    work[1].WorkInfo.RoomNumber +
                                    work[1].WorkInfo.StudentId
                                );
                              }}
                            >
                              <i className="fas fa-trash-alt"></i>
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                              ลบงานซ่อม
                            </Button>
                          </CardMedia>
                        </Card>
                      </Card>
                    ))}
                  </GridList>
                ))
              )}
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
                    <Typography
                      style={{ fontFamily: "kanit", fontSize: "25px" }}
                    >
                      Update Status
                      <br></br>
                      {refId}
                      <br></br>#{objId.slice(1, -1)}
                    </Typography>

                    <InputLabel
                      style={{
                        marginTop: "45px",
                        fontFamily: "Kanit",
                        color: "red",
                      }}
                      id="demo-simple-select-label"
                    ></InputLabel>
                    <InputLabel
                      style={{
                        marginTop: "60px",
                        fontFamily: "Kanit",
                      }}
                      id="demo-simple-select-label"
                    >
                      สถานะ
                    </InputLabel>
                    <Select
                      name="Status"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={"แล้วเสร็จ"}>แล้วเสร็จ</MenuItem>
                      <MenuItem value={"รออะไหล่"}>รออะไหล่</MenuItem>
                      <MenuItem value={"รอดำเนินการ"}>รอดำเนินการ</MenuItem>
                      <MenuItem value={"มีค่าใช้จ่าย"}>มีค่าใช้จ่าย</MenuItem>
                      <MenuItem value={"ซ่อมไม่ได้"}>ซ่อมไม่ได้</MenuItem>
                    </Select>

                    <Button
                      className={classes.Button}
                      style={{ marginLeft: "50px" }}
                      onClick={updateData}
                    >
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                      ยืนยันการเเก้ไข
                    </Button>
                  </Card>
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open2}
                onClose={handleClose2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open2}>
                  <Card className={classes.CardTrack}>
                    <Typography
                      style={{ fontFamily: "kanit", fontSize: "25px" }}
                    >
                      Update คำอธิบายการซ่อม <br></br>
                      {refId}
                      <br></br>#{objId.slice(1, -1)}
                    </Typography>
                    <InputLabel
                      style={{
                        marginTop: "45px",
                        fontFamily: "Kanit",
                        color: "red",
                      }}
                      id="demo-simple-select-label"
                    ></InputLabel>
                    <InputLabel
                      style={{
                        marginTop: "60px",
                        fontFamily: "Kanit",
                      }}
                      id="demo-simple-select-label"
                    >
                      คำอธิบายการซ่อม เช่น อาการเสีย, วิธีการแก้ไข
                    </InputLabel>

                    <TextareaAutosize
                      rowsMin={5}
                      columnMin={5}
                      name="Discription"
                      aria-label="maximum height"
                      placeholder="อาการเสีย, วิธีการแก้ไข"
                      defaultValue=""
                      style={{
                        marginTop: "10px",
                        width: "210px",
                        padding: "5px",
                        fontFamily: "Kanit",
                      }}
                      onChange={handleChangeDiscription}
                    />

                    <Button
                      className={classes.Button}
                      style={{ marginLeft: "50px" }}
                      onClick={updateData}
                    >
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                      ยืนยันการเเก้ไข
                    </Button>
                  </Card>
                </Fade>
              </Modal>
            </Box>
          </div>
        )}
      </Card>

      <Footer />
    </div>
  );
}

export default Dashboard;
