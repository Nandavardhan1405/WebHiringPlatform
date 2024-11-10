import React from "react";
import { Search, Download } from "lucide-react";
import { Badge, Button } from "./SupportComponents.jsx";

const statusColors = {
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Interview Scheduled": "bg-blue-100 text-blue-800",
  "Rejected": "bg-red-100 text-red-800",
  "Hired": "bg-green-100 text-green-800"
};

const CandidateListPage = ({ candidates, onSelectCandidate, searchTerm, setSearchTerm }) => {
  //console.log(candidates);
  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Candidate Tracker</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search candidates by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => onSelectCandidate(candidate)}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 
                      className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
                    >
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Applied: {new Date(candidate.applicationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={statusColors[candidate.status]}>
                    {candidate.status}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{candidate.experience} experience</p>
                  <Button variant="outline">
                    <Download size={16} />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateListPage;
