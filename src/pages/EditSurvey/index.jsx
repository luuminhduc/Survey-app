import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const EditSurvey = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const history = useHistory();
  useEffect(() => {
    if (!auth.uid) {
      history.push("/login");
    }
  }, []);
  return <Box my={5}></Box>;
};

export default EditSurvey;
