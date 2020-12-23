import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/action/loginAction/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firebaseReducer = useSelector((state) => state.firebaseReducer);

  const { auth } = firebaseReducer;

  console.log(auth);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink className={classes.link} to="/">
              Survey
            </NavLink>
          </Typography>
          {!auth.uid ? (
            <React.Fragment>
              <Button color="inherit">
                <NavLink className={classes.link} to="/login">
                  Login
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink className={classes.link} to="/register">
                  Register
                </NavLink>
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button onClick={() => dispatch(logOut())} color="inherit">
                <NavLink className={classes.link} to="/">
                  Logout
                </NavLink>
              </Button>
              <Button size="small" color="inherit">
                {auth.email}
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
