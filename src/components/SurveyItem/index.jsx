import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Delete, Edit } from "@material-ui/icons";
import { Box, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const SurveyItem = ({ item }) => {
  const classes = useStyles();
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { uid } = auth;
  const bull = <span className={classes.bullet}>•</span>;

  const { title, numberOfQuiz, id } = item;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Survey
          </Typography>
          {uid === item.uid ? (
            <Box>
              <IconButton>
                <NavLink to={`/surveys/edit/${id}`}>
                  <Edit color="disabled" fontSize="small"></Edit>
                </NavLink>
              </IconButton>
              <IconButton>
                <Delete color="disabled" fontSize="small"></Delete>
              </IconButton>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {numberOfQuiz} quiz
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <NavLink className={classes.link} to={`/surveys/${id}`}>
            Survey
          </NavLink>
        </Button>
        <Button size="small">
          <NavLink className={classes.link} to={`/surveys/result/${id}`}>
            Result
          </NavLink>
        </Button>
      </CardActions>
    </Card>
  );
};

export default SurveyItem;
