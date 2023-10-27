import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Avatar, Button } from "@material-ui/core";
import { CarState } from "../../CarContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const useStyles = makeStyles({
  container: {
    width: 133,
    padding: 15,
    height: "31%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "11px",
    height: "50%",
  },
  logout: {
    height: "17%",
    width: "100%",
    backgroundColor: "#ff4d30",
    marginTop: 30,
  },
  picture: {
    width: 100,
    height: 100,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
});

export default function LogoutSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert } = CarState();



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };


  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 10,
              marginRight: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 17 ,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>

              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
                style={{ color: "white", fontFamily: "Poppins", fontSize: '1rem' }}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}