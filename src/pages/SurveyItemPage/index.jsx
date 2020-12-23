import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getSurvey,
  updateSurvey,
} from "../../redux/action/surveyAction/actions";

const useStyles = makeStyles((theme) => ({
  option: {
    padding: "25px",
    backgroundColor: theme.palette.grey[100],
    width: "100%",
    cursor: "pointer",
    margin: "5px 0",
    borderRadius: "5px",
  },
  hover: {
    "&:hover": {
      backgroundColor: theme.palette.action.active,
      color: "#fff",
    },
  },
  active: {
    backgroundColor: theme.palette.action.active,
    color: "#fff",
  },
}));

const SurveyItemPage = () => {
  const classes = useStyles();
  const params = useParams();
  const { surveyItemId } = params;
  const surveyReducer = useSelector((state) => state.surveyReducer);
  const { surveyItem } = surveyReducer;
  const [survey, setSurvey] = useState(surveyItem);
  const [done, setDone] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const history = useHistory();

  const { auth } = firebaseReducer;
  const { uid } = auth;
  const dispatch = useDispatch();

  //console.log(survey.quizList.list[0].item[1].users.includes(uid));

  useEffect(() => {
    dispatch(getSurvey(surveyItemId));
  }, [surveyItemId]);

  useEffect(() => {
    setSurvey(surveyItem);
  }, [surveyItem]);

  useEffect(() => {
    const listItemArr = survey?.quizList.list.map((el) =>
      el.item.map((e) => e.users)
    );
    const done = listItemArr?.every((item) =>
      item.some((el) => el.includes(uid))
    );
    setDone(done);
  }, [survey]);

  useEffect(() => {
    console.log(surveyItem ? surveyItem.title : "");
    if (surveyItem) {
      if (
        surveyItem.quizList.list.some((el) =>
          el.item.some((e) => e.users.includes(uid))
        ) &&
        surveyItem.id === surveyItemId
      ) {
        setAlreadyDone(true);
      } else {
        setAlreadyDone(false);
      }
    }
  }, [surveyItem]);

  const renderSurveyItem = () => {
    const { title, quizList } = survey;
    const { list } = quizList;

    const handleClick = (item, optionIndex, contentIndex) => {
      const newSurvey = { ...survey };
      survey.quizList.list[contentIndex].item.forEach((el) => {
        el.users = el.users.filter((e) => e !== uid);
      });
      newSurvey.quizList.list[contentIndex].item[optionIndex].users.push(uid);
      setSurvey(newSurvey);
    };

    return (
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Box my={7}>
          {list.map((listItem, idx) => (
            <Box key={idx} my={8}>
              <Box my={4}>
                <Typography color="textPrimary" variant="h6">
                  {idx + 1}. {listItem.content}
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {listItem.item.map((option, i) => (
                  <Grid item key={i} xl="12" xs="12">
                    <Box
                      onClick={() => handleClick(option, i, idx)}
                      className={`${classes.option} ${classes.hover} ${
                        option.users.includes(uid) ? classes.active : ""
                      }`}
                    >
                      <Typography variant="span">{option.name}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const handleDone = () => {
    dispatch(updateSurvey(survey, history));
  };

  return (
    <Box my={8}>
      {survey && survey.id === surveyItemId ? (
        <Container maxWidth="md">
          {renderSurveyItem()}
          {alreadyDone ? (
            <Button>Re submit</Button>
          ) : (
            <Button
              disabled={done ? false : true}
              variant="contained"
              color="secondary"
              onClick={handleDone}
            >
              Submit
            </Button>
          )}
        </Container>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SurveyItemPage;
