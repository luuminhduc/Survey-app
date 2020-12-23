import { Box, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchTerm } from "../../redux/action/surveyAction/actions";

const SearchSurveyByName = () => {
  const surveyReducer = useSelector((state) => state.surveyReducer);
  const { searchTerm } = surveyReducer;

  const dispatch = useDispatch();

  return (
    <Box>
      <TextField
        variant="outlined"
        value={searchTerm}
        label="Search survey by name"
        onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
      ></TextField>
    </Box>
  );
};

export default SearchSurveyByName;
