import React, { useEffect, useState } from "react";
import { 
  PlusCircle,  
  CheckCircle2, 
  XCircle, 
  Pencil, 
  Trash2, 
  Send,
  List,
  Info
} from 'lucide-react';
import {
  Card
} from "@mui/material";

const MAX_QUESTION_LENGTH = 500;
const MAX_OPTION_LENGTH = 200;
const MIN_QUESTIONS = 1;

const Assessments = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [ans, setAns] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load jobs from localStorage with error handling
  useEffect(() => {
    try {
      const savedJobs = localStorage.getItem("jobs");
      if (savedJobs) {
        setJobs(JSON.parse(savedJobs));
      }
    } catch (error) {
      showSnackbar("Error loading jobs", "error");
    }
  }, []);

  // Load questions when job selection changes
  useEffect(() => {
    if (selectedJob) {
      const jobData = jobs.find((j) => j.id === selectedJob);
      if (jobData) {
        setQuestions(jobData.assignments || []);
      }
    }
  }, [selectedJob, jobs]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
    setTimeout(
      () => setSnackbar({ open: false, message: "", severity: "success" }),
      3000
    );
  };

  const validateQuestion = () => {
    const newErrors = {};

    if (!question.trim()) {
      newErrors.question = "Question is required";
    } else if (question.length > MAX_QUESTION_LENGTH) {
      newErrors.question = `Question must be less than ${MAX_QUESTION_LENGTH} characters`;
    }

    const optionErrors = options
      .map((opt, index) => {
        if (!opt.trim()) {
          return `Option ${index + 1} is required`;
        }
        if (opt.length > MAX_OPTION_LENGTH) {
          return `Option ${
            index + 1
          } must be less than ${MAX_OPTION_LENGTH} characters`;
        }
        return null;
      })
      .filter(Boolean);

    if (optionErrors.length) {
      newErrors.options = optionErrors;
    }

    if (!ans) {
      newErrors.answer = "Answer is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const jobId = e.target.value;
    setSelectedJob(jobId);
    setQuestions([]);
    setShowQuestion(false);
    setEditingQuestionId(null);
  };

  const resetForm = () => {
    setShowQuestion(false);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAns("");
    setErrors({});
    setEditingQuestionId(null);
  };

  const handleEditQuestion = (questionId) => {
    const questionToEdit = questions.find((q) => q.id === questionId);
    if (questionToEdit) {
      setQuestion(questionToEdit.question);
      setOptions(questionToEdit.options);
      setAns(questionToEdit.answer);
      setEditingQuestionId(questionId);
      setShowQuestion(true);
      setErrors({});
    }
  };

  const handleAddQuestion = () => {
    if (!validateQuestion()) return;

    try {
      const questionData = {
        question,
        options,
        answer: ans,
      };

      let updatedJobs;
      if (editingQuestionId) {
        // Update existing question
        updatedJobs = jobs.map((job) => {
          if (job.id === selectedJob) {
            return {
              ...job,
              assignments: (job.assignments || []).map((q) =>
                q.id === editingQuestionId
                  ? { ...q, ...questionData, updatedAt: new Date().toISOString() }
                  : q
              ),
            };
          }
          return job;
        });
      } else {
        // Add new question

        const newQuestion = {
          id: Date.now().toString(),
          ...questionData,
          createdAt: new Date().toISOString(),
        };

        updatedJobs = jobs.map((job) => {
          if (job.id === selectedJob) {
            const isQuestionExists = job.assignments?.some((q)=> q.question === questionData.question)
            console.log(job.assignments);
            console.log(questionData)
            if(isQuestionExists){
              throw new Error('question already exists');
            }
            return {
              ...job,
              assignments: [...(job.assignments || []), newQuestion],
            };
          }
          return job;
        });
      }

      // Save to localStorage
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setJobs(updatedJobs);

      // Update local questions state
      const jobData = updatedJobs.find((j) => j.id === selectedJob);
      setQuestions(jobData.assignments || []);

      showSnackbar(
        `Question ${editingQuestionId ? "updated" : "added"} successfully`
      );
      resetForm();
    } catch (error) {
      error.message === 'question already exists' ?
      showSnackbar('Question already exists', "error")
      :
      showSnackbar(`Error ${editingQuestionId ? "updating" : "saving"} question`, "error");
    }
  };

  const handleDeleteQuestion = (questionId) => {
    try {
      const updatedJobs = jobs.map((job) => {
        if (job.id === selectedJob) {
          return {
            ...job,
            assignments: (job.assignments || []).filter(
              (q) => q.id !== questionId
            ),
          };
        }
        return job;
      });

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      
      if (editingQuestionId === questionId) {
        resetForm();
      }

      showSnackbar("Question deleted successfully");
    } catch (error) {
      showSnackbar("Error deleting question", "error");
    }
  };

  const handleSubmitAssessment = () => {
    if (questions.length < MIN_QUESTIONS) {
      showSnackbar(`Please add at least ${MIN_QUESTIONS} question(s)`, "error");
      return;
    }

    try {
      const updatedJobs = jobs.map((job) => {
        if (job.id === selectedJob) {
          return {
            ...job,
            assessmentStatus: "submitted",
            submittedAt: new Date().toISOString(),
          };
        }
        return job;
      });

      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
      showSnackbar("Assessment submitted successfully");
    } catch (error) {
      showSnackbar("Error submitting assessment", "error");
    }
  };

  const getSelectedJobTitle = () => {
    const job = jobs.find((j) => j.id === selectedJob);
    return job ? job.title : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Job Selection Card */}
        <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-semibold text-slate-700">
                Select Position
              </h2>
            </div>
            <div className="relative">
              <select
                className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={selectedJob || ""}
                onChange={handleChange}
              >
                <option value="">Choose a position...</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Questions List */}
        {selectedJob && (
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <List className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-700">
                    Questions for {getSelectedJobTitle()}
                  </h2>
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"> 
                {questions.length === 1 ? <span>{questions.length} Question</span>: <span>{questions.length} Questions</span>}
                </span>
              </div>

              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={q.id} className="group">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 transition-all duration-200 hover:shadow-md hover:border-blue-200">
                      <div className="flex justify-between items-start gap-4">
                        <p className="text-slate-700 font-medium flex-grow">
                          <span className="text-blue-600 font-semibold mr-2">
                            Q{index + 1}.
                          </span>
                          {q.question}
                        </p>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button 
                            onClick={() => handleEditQuestion(q.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                          >
                            <Pencil className="w-4 h-4 text-slate-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {q.options.map((option, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-lg ${
                              q.answer === `Option ${i + 1}`
                                ? "bg-green-50 border border-green-200"
                                : "bg-slate-50 border border-slate-200"
                            } transition-colors duration-200`}
                          >
                            <p
                              className={`${
                                q.answer === `Option ${i + 1}`
                                  ? "text-green-700"
                                  : "text-slate-600"
                              } font-medium`}
                            >
                              {String.fromCharCode(65 + i)}. {option}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Question Form */}
        {selectedJob && (
          <div className="space-y-6">
            {!showQuestion ? (
              <button
                onClick={() => setShowQuestion(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-200/50"
              >
                <PlusCircle className="w-5 h-5" />
                Add New Question
              </button>
            ) : (
              <Card className="border-0 shadow-lg shadow-slate-200/50">
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Question
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      rows={3}
                      placeholder="Enter your question..."
                    />
                    {errors.question && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.question}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {options.map((option, index) => (
                      <div key={index} className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                          Option {String.fromCharCode(65 + index)}
                        </label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder={`Enter option ${String.fromCharCode(
                            65 + index
                          )}...`}
                        />
                      </div>
                    ))}
                    {errors.options && (
                      <div className="col-span-2">
                        {errors.options.map((error, index) => (
                          <p key={index} className="text-red-500 text-sm">
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Correct Answer
                    </label>
                    <select
                      value={ans}
                      onChange={(e) => setAns(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">Select correct answer...</option>
                      {options.map((_, index) => (
                        <option key={index} value={`Option ${index + 1}`}>
                          Option {String.fromCharCode(65 + index)}
                        </option>
                      ))}
                    </select>
                    {errors.answer && (
                      <p className="text-red-500 text-sm">{errors.answer}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddQuestion}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-200/50"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {editingQuestionId ? "Update Question" : "Save Question"}
                    </button>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200 font-medium"
                    >
                      <XCircle className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {questions.length > 0 && (
              <button
                onClick={handleSubmitAssessment}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200/50"
              >
                <Send className="w-5 h-5" />
                Submit Assessment ({questions.length}{" "}
                {questions.length === 1 ? "question" : "questions"})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4">
        {snackbar.open && (
          <div
            className={`${
              snackbar.severity === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : snackbar.severity === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-blue-50 border-blue-200 text-blue-700"
            } px-4 py-3 rounded-lg border shadow-lg flex items-center gap-2`}
          >
            {snackbar.severity === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : snackbar.severity === "error" ? (
              <XCircle className="w-5 h-5" />
            ) : (
              <Info className="w-5 h-5" />
            )}
            {snackbar.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessments;