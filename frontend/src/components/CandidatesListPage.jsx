import React from "react";
import { Card, CardContent, Typography, Chip, IconButton } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";

const CandidateListPage = ({ candidates, onSelectCandidate }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-6">
      <Typography
        variant="h4"
        className="text-center font-bold text-indigo-700 mb-6"
      >
        Candidate Tracker
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="transition-transform transform hover:duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <CardContent className="flex justify-between items-center">
              <div>
                <Typography
                  variant="h6"
                  className="font-semibold text-indigo-700 cursor-pointer hover:underline"
                  onClick={() => onSelectCandidate(candidate)}
                >
                  {candidate.name}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  Applied on: {candidate.applicationDate}
                </Typography>
              </div>
              <div className="flex items-center space-x-3">
                <IconButton
                  href={candidate.resumeLink}
                  color="primary"
                  size="small"
                  className="bg-indigo-100 hover:bg-indigo-200 rounded-full p-1"
                >
                  <CloudDownload fontSize="small" />
                </IconButton>
                <Chip
                  label={candidate.status}
                  color={
                    candidate.status === "Interview Scheduled"
                      ? "success"
                      : "warning"
                  }
                  className="capitalize"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateListPage;