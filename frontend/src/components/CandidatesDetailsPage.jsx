import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";

const CandidateDetailsPage = ({ candidate, onBack, onStatusUpdate }) => {
  const [status, setStatus] = useState(candidate.status);
  const [toastOpen, setToastOpen] = useState(false);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusUpdate(candidate.id, newStatus);
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-6">
      <Button
        onClick={onBack}
        className="text-indigo-600 hover:text-indigo-800 mb-4"
      >
        &larr; Back to List
      </Button>
      <Card className="max-w-lg mx-auto p-6 shadow-xl rounded-lg">
        <CardContent>
          <Typography variant="h5" className="font-bold text-indigo-700 mb-4">
            {candidate.name}
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-2">
            <strong>Email:</strong> example@example.com
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-2">
            <strong>Contact:</strong> +123456789
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-2">
            <strong>Skills:</strong> React, Node.js, Express, MongoDB
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-2">
            <strong>Experience:</strong> 2 years in software development
          </Typography>

          <div className="my-4">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 mb-1"
            >
              Resume
            </Typography>
            <Button
              href={candidate.resumeLink}
              variant="outlined"
              className="text-indigo-500 border-indigo-500 hover:bg-indigo-50"
            >
              Download Resume
            </Button>
          </div>

          <div className="mt-4">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 mb-1"
            >
              Status
            </Typography>
            <Select
              value={status}
              onChange={handleStatusChange}
              className="w-full border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            >
              <MenuItem value="Under Review">Under Review</MenuItem>
              <MenuItem value="Interview Scheduled">
                Interview Scheduled
              </MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Hired">Hired</MenuItem>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Snackbar (toast) for status update confirmation */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message="Status updated successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default CandidateDetailsPage;