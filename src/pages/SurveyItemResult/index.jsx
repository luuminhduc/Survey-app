import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSurvey } from "../../redux/action/surveyAction/actions";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "80px",
    width: "100%",
    position: "relative",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
  },
  progress: {
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    backgroundColor: theme.palette.success.main,
    zIndex: "1",
  },
  text: {
    zIndex: "100",
    position: "relative",
  },
}));

const SurveyItemResult = () => {
  const surveyReducer = useSelector((state) => state.surveyReducer);
  const { surveyItem } = surveyReducer;

  const classes = useStyles();

  const dispatch = useDispatch();

  const params = useParams();
  const { surveyItemResultId } = params;

  useEffect(() => {
    dispatch(getSurvey(surveyItemResultId));
  }, [surveyItemResultId]);

  const renderGroupItem = (listItem, idx) => {
    const userArr = listItem.item.map((el) => el.users);
    const total = userArr.map((el) => el.length).reduce((a, b) => (a += b));
    return (
      <React.Fragment>
        <Typography variant="h6">
          {idx}. {listItem.content}
        </Typography>
        <Box my={3}>
          {listItem.item.map((option) => (
            <Box className={classes.container} my={3}>
              <Box
                width={(option.users.length * 100) / total + "%"}
                className={classes.progress}
              ></Box>
              <Typography className={classes.text} variant="p">
                {option.name}
              </Typography>
              <Box>
                <Typography className={classes.text} variant="p">
                  {option.users.length} / {total}
                </Typography>
                <Typography className={classes.text}>
                  {((option.users.length * 100) / total).toFixed(2)}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </React.Fragment>
    );
  };

  const renderResult = () => {
    const { title, quizList } = surveyItem;
    const { list } = quizList;

    return (
      <React.Fragment>
        <Typography variant="h4">{title}</Typography>
        <Box my={6}>
          {list.map((listItem, idx) => (
            <Box key={idx} my={4}>
              {renderGroupItem(listItem, idx)}
            </Box>
          ))}
        </Box>
      </React.Fragment>
    );
  };

  console.log(surveyItem, surveyItemResultId);

  return (
    <Box my={4}>
      <Container maxWidth="md">
        {surveyItem && surveyItem.id === surveyItemResultId
          ? renderResult()
          : ""}
      </Container>
    </Box>
  );
};

export default SurveyItemResult;
