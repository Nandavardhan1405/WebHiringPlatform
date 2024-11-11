import React, { useState } from "react";
import {  ArrowLeft, Copy, Check } from "lucide-react";
import { Badge, Button, Select } from "./SupportComponents.jsx";
const statusColors = {
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Interview Scheduled": "bg-blue-100 text-blue-800",
  "Rejected": "bg-red-100 text-red-800",
  "Hired": "bg-green-100 text-green-800"
};
const CandidateDetailsModal = ({ candidate, onBack, onStatusUpdate }) => {
  const [showAlert, setShowAlert] = useState(false);
  const resumeLink = candidate.resumeLink || "";
  const [copySuccess, setCopySuccess] = useState(false);

  const handleStatusUpdate = (newStatus) => {
    onStatusUpdate(candidate.id, newStatus);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(resumeLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm cursor-default overflow-y-auto">
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl m-4 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
    <Button
      onClick={onBack}
      variant="secondary"
      className="group hover:bg-gray-200 bg-white  text-sm sm:text-base text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 dark:bg-gray-600"
    >
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
      <span className="ml-2">Back to List</span>
    </Button>

    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {candidate.name}
        </h2>
        <Badge className={`${statusColors[candidate.status]} whitespace-nowrap`}>
          {candidate.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Information</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-900 dark:text-gray-300 break-words">{candidate.email}</p>
            <p className="text-sm sm:text-base text-gray-900 dark:text-gray-300">{candidate.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-900 dark:text-gray-300">{candidate.experience}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg transition-shadow text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
            <Select
              value={candidate.status}
              onChange={handleStatusUpdate}
              options={["Under Review", "Interview Scheduled", "Rejected", "Hired"]}
              className="mt-2 w-full dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resume Link</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={resumeLink}
              readOnly
              className="flex-1 px-4 py-2 text-sm sm:text-base bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border dark:border-gray-600 rounded-lg"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleCopyLink}
                variant="outline"
                className={`flex-1 sm:flex-none dark:text-white dark:hover:text-black ${copySuccess ? "bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400" : ""}`}
              >
                {copySuccess ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-2">{copySuccess ? "Copied!" : "Copy"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {showAlert && (
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-[70%] sm:w-auto px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 shadow-lg animate-fade-in">
        <p className="text-sm text-green-800 dark:text-green-400">Status updated successfully!</p>
      </div>
    )}
  </div>
</div>

  );
};

export default CandidateDetailsModal;
