import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "40%",
    right: "0",
  },
  content: {
    margin: "10px 0",
  },
}));

const AlertList = () => {
  const commonReducer = useSelector((state) => state.commonReducer);
  const classes = useStyles();
  const { alertList } = commonReducer;
  return alertList.length > 0 ? (
    <Box className={classes.root}>
      {alertList.map((el, idx) => (
        <Alert
          variant="filled"
          className={classes.content}
          severity={el.severity}
        >
          {el.text}
        </Alert>
      ))}
    </Box>
  ) : (
    ""
  );
};

export default AlertList;
