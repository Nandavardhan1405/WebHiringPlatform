import { useState, useEffect } from "react";
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

const App = () => {
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Job Dropdown */}
      <FormControl sx={{ m: 1, minWidth: 150, display: "inline-block" }}>
        <InputLabel id="job-select-label">
          Job
        </InputLabel>
        <Select
          labelId="job-select-label"
          id="job-select"
          value={job}
          label="Job"
          onChange={handleChange}
          className="w-28"
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
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", color: "#2e7d32" }}
        >
          Saved Questions for {job}
        </Typography>
        <Grid container spacing={2}>
          {questions.map((q, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "#f0f4f7",
                  borderRadius: "8px",
                  position: "relative",
                }}
              >
                <CardContent>
                  <IconButton
                    aria-label="delete"
                    sx={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <Typography variant="h6" color="primary">
                    Question {index + 1}: {q.question}
                  </Typography>
                  <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
                    {q.options.map((option, i) => (
                      <li key={i}>
                        <Typography variant="body2" color="textSecondary">
                          Option {i + 1}: {option}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                  >
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
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            sx={{ mb: 2 }}
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

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="answer-select-label">Answer</InputLabel>
            <Select
              labelId="answer-select-label"
              value={ans}
              label="Answer"
              onChange={(e) => setAns(e.target.value)}
              required
            >
              {options.map((_, index) => (
                <MenuItem key={index} value={`Option ${index + 1}`} required>
                  Option {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
          </Box>
        </Box>
      )}

      
      <Button
        variant="outlined"
        sx={{
          mt: 2,
          fontWeight: "bold",
          color: "#2e7d32",
          borderColor: "#2e7d32",
        }}
        onClick={addQuestion}
      >
        Add Question
      </Button>

    
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAssessment}
        disabled={!questions.length}
        sx={{ mt: 2, ml: 2 }}
      >
        Submit Assessment
      </Button>
    </div>
  );
};

export default App;
