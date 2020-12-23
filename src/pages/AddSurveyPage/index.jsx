import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addSurvey } from "../../redux/action/surveyAction/actions";
import { useHistory } from "react-router-dom";
import { timeStamp } from "../../firebase/config";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: "0 5px",
  },
  li: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  liCol: {
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  liItemLeft: {
    marginRight: "10px",
    fontSize: "25px",
    color: theme.palette.grey[800],
  },
  liItemRight: {
    fontSize: "25px",
    color: theme.palette.grey[600],
  },
  option: {
    color: theme.palette.grey[600],
  },
}));

const AddSurveyPage = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [numberOfQuiz, setNumberOfQuiz] = useState(1);
  const [quizList, setQuizList] = useState([]);
  const [step, setStep] = useState(1);
  const [nextStatus, setNextStatus] = useState(false);
  const limit = 4;
  const history = useHistory();
  const dispatch = useDispatch();
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;

  useEffect(() => {
    if (!auth.uid) history.push("/login");
  }, []);

  const finishEveryQuiz = () => {
    const contentIsDone = quizList
      .map((quiz) => quiz.content)
      .every((el) => el !== "");
    const optionArr = quizList.map((quiz) => quiz.optionList);

    const countingArr = (arr) => {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name) count++;
      }
      return count;
    };

    const done = optionArr.every((options) => {
      if (countingArr(options) >= 2) {
        return true;
      }
      return false;
    });
    if (contentIsDone && done) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < numberOfQuiz; i++) {
      arr.push({ id: uuid(), content: "", optionList: [] });
      for (let j = 0; j < 4; j++) {
        arr[i].optionList.push({ id: uuid(), name: "", users: [] });
      }
    }
    setQuizList(arr);
  }, [numberOfQuiz]);

  useEffect(() => {
    if (!title) {
      setNextStatus(false);
    } else {
      setNextStatus(true);
    }
  }, [title]);

  useEffect(() => {
    if (step === 3) {
      // console.log(finishEveryQuiz());
      if (finishEveryQuiz()) {
        console.log("sd");
        setNextStatus(true);
      } else {
        setNextStatus(false);
      }
    }
  }, [step]);

  useEffect(() => {
    if (finishEveryQuiz() && step !== 1) {
      setNextStatus(true);
    } else {
      if (step === 3) {
        setNextStatus(false);
      }
    }
  }, [quizList]);

  const renderQuestions = () => {
    let ui;
    switch (step) {
      case 1:
        ui = renderTitleQuestion();
        break;
      case 2:
        ui = renderNumberOfQuizQuestion();
        break;
      case 3:
        ui = renderQuizListQuestion();
        break;
      case 4:
        ui = renderConfirmation();
        break;
      default:
    }
    return ui;
  };

  const renderButton = () => {
    const toNextStep = () => {
      setStep(step + 1);
    };
    const toPrevStep = () => {
      setStep(step - 1);
      setNextStatus(true);
    };

    const handlePrev = () => {
      toPrevStep();
    };

    const handleNext = () => {
      toNextStep();
    };

    const handleConfirm = () => {
      const newQuizList = quizList.map((el) => ({
        item: el.optionList.filter((e) => e.name),
        content: el.content,
      }));
      const survey = {
        title,
        numberOfQuiz,
        quizList: { list: newQuizList },
        uid: auth.uid,
        time: timeStamp(),
      };
      dispatch(addSurvey(survey, history));
    };

    return (
      <Box
        my={3}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          className={classes.button}
          onClick={handlePrev}
          disabled={step <= 1 ? true : false}
        >
          Prev
        </Button>
        {step === limit ? (
          <Button
            variant="contained"
            color="secondary"
            className={`${classes.button}`}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        ) : (
          <Button
            variant="contained"
            className={classes.button}
            disabled={step >= limit || !nextStatus ? true : false}
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </Box>
    );
  };

  const renderTitleQuestion = () => {
    const handleChange = (e) => {
      if (e.target.value) {
        setNextStatus(true);
      } else {
        setNextStatus(false);
      }
      setTitle(e.target.value);
    };
    return (
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={handleChange}
        variant="outlined"
      ></TextField>
    );
  };

  const renderNumberOfQuizQuestion = () => {
    const handleChange = (e) => {
      setNumberOfQuiz(e.target.value);
    };

    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">
          Number of quiz
        </InputLabel>
        <Select
          onChange={handleChange}
          fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Age"
          value={numberOfQuiz}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const renderQuizListQuestion = () => {
    return quizList?.map((el, idx) => (
      <Box my={5} key={idx}>
        {renderQuiz(el, idx)}
      </Box>
    ));
  };

  const renderQuiz = (quiz, idx) => {
    const quizIndex = quizList.findIndex((el) => el.id === quiz.id);

    const handleContent = (e) => {
      const newQuizList = [...quizList];
      newQuizList[quizIndex].content = e.target.value;
      setQuizList(newQuizList);
    };

    const handleOption = (value, id) => {
      const newQuizList = [...quizList];
      const optionIndex = newQuizList[quizIndex].optionList.findIndex((el) => {
        return el.id === id;
      });
      newQuizList[quizIndex].optionList[optionIndex].name = value;
      setQuizList(newQuizList);
    };

    return (
      <Container maxWidth="sm">
        <FormGroup>
          <Box my={3}>
            <TextField
              fullWidth
              label={`Content ${idx + 1}`}
              variant="outlined"
              onChange={(e) => handleContent(e)}
              value={quizList[idx].content}
            ></TextField>
          </Box>
          <Grid container spacing={5}>
            {quiz.optionList.map((el, i) => (
              <Grid key={i} item xs="6">
                <TextField
                  label={`Option ${i + 1}`}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleOption(e.target.value, el.id)}
                  value={el.name}
                ></TextField>
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </Container>
    );
  };

  const renderConfirmation = () => {
    return (
      <Container maxWidth="sm">
        <Box my={5} textAlign="center">
          <Typography variant="h2">Confirm</Typography>
        </Box>
        <Box my={2} className={classes.li}>
          <Typography className={classes.liItemLeft}>Title:</Typography>
          <Typography className={classes.liItemRight}>{title}</Typography>
        </Box>
        <Box my={2} className={classes.li}>
          <Typography className={classes.liItemLeft}>
            Number of quiz:
          </Typography>
          <Typography className={classes.liItemRight}>
            {numberOfQuiz}
          </Typography>
        </Box>
        <Box my={2} className={classes.liCol}>
          <Typography variant="h4">Quiz</Typography>
          <Box>
            {quizList.map((quiz) => (
              <Box my={3}>
                <Typography variant="h5">{quiz.content}</Typography>
                <Box my={2}>
                  <Grid container spacing={3}>
                    {quiz.optionList.map((el) => (
                      <Grid xs="6" item>
                        <Typography className={classes.option}>
                          {el.name}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    );
  };

  return (
    <Box my={4}>
      <Container maxWidth="md">
        {renderQuestions()}
        {renderButton()}
      </Container>
    </Box>
  );
};

export default AddSurveyPage;
