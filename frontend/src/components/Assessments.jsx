import React, { useState, useEffect } from "react";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Assessments = () => {
  const [job, setJob] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [ans, setAns] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (job) {
      const savedQuestions = JSON.parse(localStorage.getItem(job)) || [];
      setQuestions(savedQuestions);
    }
  }, [job]);

  const handleChange = (e) => setJob(e.target.value);
  const addQuestion = () => setShowQuestion(true);
  const deleteQuestion = () => {
    setShowQuestion(false);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAns("");
  };

  const handleOptionChange = (index, newValue) => {
    const updatedOptions = [...options];
    updatedOptions[index] = newValue;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (question && options.every((opt) => opt) && ans) {
      const newQuestion = { question, options, answer: ans };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      localStorage.setItem(job, JSON.stringify(updatedQuestions));
      deleteQuestion();
    } else {
      alert("Please fill out the question, all options, and select an answer.");
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    localStorage.setItem(job, JSON.stringify(updatedQuestions));
  };

  const handleSubmitAssessment = () => {
    if (questions.length === 0) {
      alert("Please add at least one question to submit the assessment.");
      return;
    }
    alert("Assessment submitted successfully!");
  };

  const jobs = ["Job 1", "Job 2", "Job 3", "Job 4", "Job 5", "Job 6"];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-6">
      {/* Job Dropdown */}
      <FormControl fullWidth className="mb-6">
        <InputLabel id="job-select-label">Job</InputLabel>
        <Select
          labelId="job-select-label"
          id="job-select"
          value={job}
          label="Job"
          onChange={handleChange}
        >
          {jobs.map((job, index) => (
            <MenuItem key={index} value={job}>
              {job}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select the preferred job</FormHelperText>
      </FormControl>

      {/* Display Saved Questions */}
      <Box className="mt-6">
        <Typography
          variant="h5"
          className="font-bold text-indigo-700 mb-4"
        >
          Saved Questions for {job}
        </Typography>
        <Grid container spacing={3}>
          {questions.map((q, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card className="bg-indigo-50 rounded-lg shadow-md">
                <CardContent>
                  <IconButton
                    aria-label="delete"
                    className="float-right"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <Typography variant="h6" className="text-indigo-700">
                    Question {index + 1}: {q.question}
                  </Typography>
                  <ul className="pl-5 mt-2">
                    {q.options.map((option, i) => (
                      <li key={i} className="text-gray-600">
                        Option {i + 1}: {option}
                      </li>
                    ))}
                  </ul>
                  <Typography className="text-gray-800 font-semibold mt-2">
                    Answer: {q.answer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Question Input Form */}
      {showQuestion && (
        <Box className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="mb-4"
          />

          <Grid container spacing={2}>
            {options.map((option, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <TextField
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
            ))}
          </Grid>

          <FormControl fullWidth className="mt-4">
            <InputLabel id="answer-select-label">Answer</InputLabel>
            <Select
              labelId="answer-select-label"
              value={ans}
              label="Answer"
              onChange={(e) => setAns(e.target.value)}
              required
            >
              {options.map((_, index) => (
                <MenuItem key={index} value={`Option ${index + 1}`}>
                  Option {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex gap-4 mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={handleAddQuestion}
            >
              OK!
            </Button>
            <Button variant="outlined" color="error" onClick={deleteQuestion}>
              Cancel
            </Button>
          </div>
        </Box>
      )}

      {/* Buttons */}
      <div className="mt-6">
        <Button
          variant="outlined"
          color="primary"
          onClick={addQuestion}
          className="mr-4"
        >
          Add Question
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitAssessment}
          disabled={!questions.length}
        >
          Submit Assessment
        </Button>
      </div>
    </div>
  );
};

export default Assessments;
