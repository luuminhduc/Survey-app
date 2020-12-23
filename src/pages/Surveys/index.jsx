import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import SearchSurveyByName from "../../components/SearchSurveyByName";
import SurveyItem from "../../components/SurveyItem";
import { getAllSurvey } from "../../redux/action/surveyAction/actions";

const Surveys = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const surveyReducer = useSelector((state) => state.surveyReducer);
  const { surveyList, searchTerm } = surveyReducer;
  const { auth } = firebaseReducer;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSurvey());
  }, []);

  useEffect(() => {
    if (!auth.uid) history.push("/login");
  }, []);

  return (
    <Box my={4}>
      <Container>
        <Box my={4}>
          <Typography variant="h4">Surveys</Typography>
        </Box>
        <SearchSurveyByName />
        <Box my={4}>
          <Grid container spacing={3}>
            {surveyList
              ?.filter(
                (el) =>
                  el.title.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
              )
              .map((item, idx) => (
                <Grid xs="12" sm="6" md="4" lg="3" key={idx} item>
                  <SurveyItem item={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Surveys;
