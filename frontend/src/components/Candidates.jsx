import React, { useState, useEffect } from "react";
import CandidateListPage from "./CandidatesListPage";
import CandidateDetailsPage from "./CandidatesDetailsPage";

const initialCandidates = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "555-1234",
      experience: "5 years",
      skills: ["JavaScript", "React", "Node.js"],
      status: "Under Review",
      applicationDate: "2023-07-15",
      notes: "Strong candidate with excellent technical skills",
      resume: "path/to/john_doe_resume.pdf"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "555-5678",
      experience: "3 years",
      skills: ["UI/UX Design", "Photoshop", "Figma"],
      status: "Interview Scheduled",
      applicationDate: "2023-08-01",
      notes: "Creative designer with a keen eye for detail",
      resume: "path/to/jane_smith_resume.pdf"
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "555-8765",
      experience: "4 years",
      skills: ["Python", "Django", "Machine Learning"],
      status: "Rejected",
      applicationDate: "2023-06-20",
      notes: "Good skills, but not a fit for this position",
      resume: "path/to/alice_johnson_resume.pdf"
    },
    {
      id: 4,
      name: "Bob Williams",
      email: "bob.williams@example.com",
      phone: "555-4321",
      experience: "6 years",
      skills: ["Project Management", "Agile", "Scrum"],
      status: "Hired",
      applicationDate: "2023-05-12",
      notes: "Great leadership qualities and technical knowledge",
      resume: "path/to/bob_williams_resume.pdf"
    }
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates, setCandidates] = useState(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // useEffect(() => {
  //   try{
  //     const savedCandidates = localStorage.getItem("candidates");
  //   if (savedCandidates) {
  //     setCandidates(JSON.parse(savedCandidates));
  //   }
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // },[]);

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

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
// console.log(candidates)
  return (
    <div className="min-h-screen bg-gray-50">
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
  );
};

export default App;