import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const BigLoading = ({ status }) => {
  const classes = useStyles();
  const commonReducer = useSelector((state) => state.commonReducer);
  const { loading } = commonReducer;

  return status || loading ? (
    <Box className={classes.root}>
      <CircularProgress variant="indeterminate" size={60}></CircularProgress>
    </Box>
  ) : (
    ""
  );
};

export default BigLoading;
