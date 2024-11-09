import React, { useState } from "react";
import CandidateListPage from "./CandidatesListPage";
import CandidateDetailsPage from "./CandidatesDetailsPage";

const App = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "John Doe",
      resumeLink: "#",
      applicationDate: "2024-11-01",
      status: "Under Review",
    },
    {
      id: 2,
      name: "Jane Smith",
      resumeLink: "#",
      applicationDate: "2024-10-20",
      status: "Interview Scheduled",
    },
  ]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackToList = () => {
    setSelectedCandidate(null);
  };

  const handleStatusUpdate = (id, newStatus) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  return (
    <div >
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
        />
      )}
    </div>
  );
};

export default App;