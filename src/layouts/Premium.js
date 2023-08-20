import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DoneIcon from "@mui/icons-material/Done";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import logo_two from "./logo_two.png";
import logo_three from "./logo_three.png";
import logo_four from "./logo_four.png";
import logo_five from "./logo_five.jpg";
import logo_six from "./logo_six.png";
import "../styles/App.css";
import { Card, Grid, List, ListItem, Paper } from "@mui/material";
import Footer from "../components/home/Footer";
import { useStateProvider } from "../components/utils/StateProvider";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Premium() {
  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const [{ name }] = useStateProvider();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const width = window.screen.width;

  const navigate = useNavigate();

  return (
    <div style={{ margin: "-10px" }}>
      <AppBar position="static" sx={{ background: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}>
                {name ? (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/login")}>
                        {name}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/signup")}>
                        Sign up
                      </Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/login")}>
                        Log in
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/signup")}>
                        Sign up
                      </Typography>
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={() => navigate("/")}>
                    Home
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <img
              src={logo}
              onClick={() => navigate("/")}
              style={{ width: "135px", height: "55px" }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "right",
              }}>
              <Button
                onClick={() => navigate("/premium")}
                sx={{ my: 2, color: "white", display: "block" }}>
                Premium
              </Button>
              <Button
                target="_blank"
                onClick={() =>
                  navigate("https://www.spotify.com/in-en/download/windows/")
                }
                sx={{ my: 2, color: "white", display: "block" }}>
                Download
              </Button>
              <Button
                onClick={() => navigate("/")}
                sx={{ my: 2, color: "white", display: "block" }}>
                Support
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        className="premimumMain"
        sx={{
          display: "flex",
          background: "#a1248b",
          "@media (max-width: 1001px)": {
            flexDirection: "column",
          },
        }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "50%",
          }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "cursive",
              mt: "20px",
              mb: "20px",
              display: "flex",
              alignSelf: "baseline",
            }}>
            ₹0 for 3 months of Premium
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: "arial", mb: "20px" }}>
            Listen to music ad-free and offline, free today until 17 November
            2023. Cancel anytime.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mb: "20px",
              gap: 2,
              "@media (max-width: 1001px)": {
                flexDirection: "column",
              },
            }}>
            <Button
              sx={{
                width: "200px",
                height: "65px",
                borderRadius: "30px",
                background: "black",
                color: "white",
              }}
              variant="contained">
              GET 3 MONTHS FOR $0
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "2px solid white",
                color: "white",
                height: "50px",
                borderRadius: "13px",
                mt: "5px",
              }}>
              VIEW PLANS
            </Button>
          </Box>
          <Typography variant="h6" fontSize={10} sx={{ mb: "20px" }}>
            Individual plan only. ₹119/month after. Terms and conditions apply.
            Open only to users who haven't already tried Premium. Offer ends
            12/09/23.
          </Typography>
        </Container>
        <Box
          sx={{
            display: "flex",
            m: "30px",
            "@media (max-width: 1001px)": {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              m: 0,
              mt: "30px",
            },
          }}>
          <img src={logo_two} />
        </Box>
      </Box>
      <Box sx={{ background: "white", color: "black" }}>
        <div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "38px",
              fontWeight: 700,
              paddingTop: "50px",
              paddingBottom: "48px",
            }}>
            The power of Premium
          </h2>
        </div>
        <Grid container spacing={2}>
          <Grid item md={6} sm={12} lg={3}>
            <ListItem>
              <img
                style={{
                  width: "140px",
                  height: "140px",
                  marginBottom: "10px",
                }}
                src={logo_three}
                sty
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Ad-free music listening</h3>
                <h5 style={{ width: "203px" }}>Enjoy uninterrupted music.</h5>
              </div>
            </ListItem>
          </Grid>
          <Grid item md={6} sm={12} lg={3}>
            <ListItem>
              {" "}
              <div>
                <img
                  style={{
                    width: "140px",
                    height: "140px",
                    marginBottom: "10px",
                  }}
                  src={logo_four}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Offline playback</h3>
                <h5 style={{ width: "203px" }}>
                  Save your data by listening offline.
                </h5>
              </div>
            </ListItem>
          </Grid>
          <Grid item md={6} sm={12} lg={3}>
            <ListItem>
              {" "}
              <img
                style={{
                  width: "140px",
                  height: "140px",
                  marginBottom: "10px",
                }}
                src={logo_five}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Play everywhere</h3>
                <h5 style={{ width: "203px" }}>
                  Listen on your speakers, TV, and other favorite devices.
                </h5>
              </div>
            </ListItem>
          </Grid>
          <Grid item md={6} sm={12} lg={3}>
            <ListItem>
              {" "}
              <img
                style={{
                  width: "140px",
                  height: "140px",
                  marginBottom: "10px",
                }}
                src={logo_six}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Pay your way</h3>
                <h5 style={{ width: "203px" }}>
                  Prepay with Paytm, UPI, and more.
                </h5>
              </div>
            </ListItem>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ background: "white", color: "black" }}>
        <Box>
          <h1
            style={{
              textAlign: "center",
              fontSize: "38px",
              fontWeight: 700,
              paddingTop: "100px",
              paddingBottom: "20px",
            }}>
            Pick your Premium
          </h1>
          <h6
            style={{ textAlign: "center", fontSize: "18px", fontWeight: 700 }}>
            Listen without limits on your phone, speaker, and other devices.
          </h6>
        </Box>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pb: "40px",
            "@media (max-width: 1204px)": {
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          }}>
          <Paper
            elevation={6}
            sx={{
              width: "280px",
              mt: "60px",
              "@media (max-width: 1204px)": {
                width: "350px",
              },
            }}>
            <div
              style={{
                width: "180px",
                border: "2px solid blue",
                color: "blue",
                padding: "5px",
                marginLeft: "10px",
                marginTop: "10px",
              }}>
              {" "}
              One-time plans available
            </div>
            <div style={{ paddingLeft: "15px" }}>
              <h3 style={{ fontSize: "26px", paddingTop: "8px" }}>Mini</h3>
              <h5
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  paddingBottom: "7px",
                  paddingTop: "3px",
                }}>
                From ₹7/day
              </h5>
              <h6 style={{ fontSize: "15px", marginBottom: "10px" }}>
                1 account on mobile only
              </h6>
              <hr></hr>
              <div style={{ display: "flex", paddingTop: "25px" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Ad-free music listening on mobile
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Group Session
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Download 30 songs on 1 mobile device
                </h3>
              </div>
              <button
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "25px",
                  width: "95%",
                  height: "46px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}>
                VIEW PLANS
              </button>
            </div>
          </Paper>
          <Paper
            elevation={6}
            sx={{
              width: "280px",
              mt: "60px",
              "@media (max-width: 1204px)": {
                width: "350px",
              },
            }}>
            <div
              style={{
                width: "101px",
                background: "blue",
                color: "white",
                padding: "5px",
                marginLeft: "10px",
                marginTop: "10px",
                borderRadius: "10px",
              }}>
              {" "}
              3 months free
            </div>
            <div
              style={{
                width: "180px",
                border: "2px solid blue",
                color: "blue",
                padding: "5px",
                marginLeft: "10px",
                marginTop: "10px",
                borderRadius: "10px",
              }}>
              {" "}
              One-time plans available
            </div>
            <div style={{ paddingLeft: "15px" }}>
              <h3 style={{ fontSize: "26px", paddingTop: "8px" }}>
                Individual
              </h3>
              <h5
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  paddingBottom: "7px",
                  paddingTop: "3px",
                }}>
                ₹119/month after offer period
              </h5>
              <h6 style={{ fontSize: "15px", marginBottom: "10px" }}>
                1 account
              </h6>
              <hr></hr>
              <div style={{ display: "flex", paddingTop: "25px" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Ad-free music listening
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Group Session
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Download 10k songs/device on 5 devices
                </h3>
              </div>
              <button
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "25px",
                  width: "95%",
                  height: "46px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}>
                VIEW PLANS
              </button>
            </div>
          </Paper>
          <Paper
            elevation={6}
            sx={{
              width: "280px",
              mt: "60px",
              "@media (max-width: 1204px)": {
                width: "350px",
              },
            }}>
            <div
              style={{
                width: "101px",
                background: "blue",
                color: "white",
                padding: "5px",
                marginLeft: "10px",
                marginTop: "10px",
                borderRadius: "10px",
              }}>
              {" "}
              1 months free
            </div>
            <div
              style={{
                width: "180px",
                border: "2px solid blue",
                color: "blue",
                padding: "5px",
                marginLeft: "10px",
                marginTop: "10px",
              }}>
              {" "}
              One-time plans available
            </div>
            <div style={{ paddingLeft: "15px" }}>
              <h3 style={{ fontSize: "26px", paddingTop: "8px" }}>Duo</h3>
              <h5
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  paddingBottom: "7px",
                  paddingTop: "3px",
                }}>
                ₹149/month after offer period
              </h5>
              <h6 style={{ fontSize: "15px", marginBottom: "10px" }}>
                2 accounts
              </h6>
              <hr></hr>
              <div style={{ display: "flex", paddingTop: "25px" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  For couples who live together
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Ad-free music listening
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Download 10k songs/device, on 5 devices per account
                </h3>
              </div>
              <button
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "25px",
                  width: "95%",
                  height: "46px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}>
                VIEW PLANS
              </button>
            </div>
          </Paper>
          <Paper
            elevation={6}
            sx={{
              width: "280px",
              mt: "60px",
              "@media (max-width: 1204px)": {
                width: "350px",
              },
            }}>
            <div
              style={{
                width: "101px",
                background: "blue",
                color: "white",
                padding: "5px",
                marginLeft: "10px",
                marginTop: "10px",
                borderRadius: "10px",
              }}>
              {" "}
              1 months free
            </div>
            <div
              style={{
                width: "180px",
                border: "2px solid blue",
                color: "blue",
                padding: "5px",
                marginLeft: "10px",
                marginTop: "10px",
              }}>
              {" "}
              One-time plans available
            </div>
            <div style={{ paddingLeft: "15px" }}>
              <h3 style={{ fontSize: "26px", paddingTop: "8px" }}>Family</h3>
              <h5
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  paddingBottom: "7px",
                  paddingTop: "3px",
                }}>
                ₹179/month after offer period
              </h5>
              <h6 style={{ fontSize: "15px", marginBottom: "10px" }}>
                Up to 6 accounts
              </h6>
              <hr></hr>
              <div style={{ display: "flex", paddingTop: "25px" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  For family who live together
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Block explicit music
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Ad-free music listening
                </h3>
              </div>
              <div style={{ display: "flex" }}>
                <DoneIcon />
                <h3 style={{ marginLeft: "10px", width: "250px" }}>
                  Group Session
                </h3>
              </div>
              <button
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "25px",
                  width: "95%",
                  height: "46px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}>
                VIEW PLANS
              </button>
            </div>
          </Paper>
          {/* <Paper elevation={3}></Paper>
          <Paper elevation={3}></Paper>
          <Paper elevation={3}></Paper> */}
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
export default Premium;
