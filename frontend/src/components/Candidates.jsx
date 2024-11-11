import React, { useState, useEffect } from "react";
import CandidateListPage from "./CandidatesListPage";
import CandidateDetailsPage from "./CandidatesDetailsPage";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const { jobId } = useParams();
  console.log(jobId)
  const navigate = useNavigate();

  useEffect(() => {
    let jobData = JSON.parse(localStorage.getItem("jobs"));
    const job = jobData.find((job) => job.id === jobId);

    console.log(job);
    setCandidates(job?.candidates || []);
  }, [jobId]);

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackToList = () => {
    setSelectedCandidate(null);
    // navigate(0);
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    );

    let jobData = JSON.parse(localStorage.getItem("jobs"));
    if (jobData) {
      const jobIndex = jobData.findIndex((job) => job.id === jobId);
      if (jobIndex !== -1) {
        jobData[jobIndex] = {
          ...jobData[jobIndex],
          candidates: updatedCandidates,
        };
        localStorage.setItem("jobs", JSON.stringify(jobData));
      }
    }

    setCandidates(updatedCandidates);
    setSelectedCandidate((prevData) => ({ ...prevData, status: newStatus }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="relative">
            Back to Job Listings
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </span>
        </button>

        {selectedCandidate ? (
          <CandidateDetailsPage
            candidate={selectedCandidate}
            onBack={handleBackToList}
            onStatusUpdate={handleStatusUpdate}
          />
        ) : (
          <CandidateListPage
            candidates={candidates}
            onSelectCandidate={handleSelectCandidate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
    </div>
  );
};

export default App;
