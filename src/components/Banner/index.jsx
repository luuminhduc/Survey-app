import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0 10px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <Box
      my={10}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Button className={classes.button} color="secondary" variant="contained">
        <NavLink className={classes.link} to="/surveys">
          Take surveys
        </NavLink>
      </Button>
      <Button className={classes.button} color="primary" variant="contained">
        <NavLink className={classes.link} to="/addSurvey">
          Add survey
        </NavLink>
      </Button>
    </Box>
  );
};

export default Banner;
