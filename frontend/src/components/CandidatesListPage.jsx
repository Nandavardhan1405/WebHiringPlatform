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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Candidate Tracker
          </h1>
          
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search candidates by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              aria-label="Search candidates"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCandidates.map((candidate) => (
            <div 
              key={candidate.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-default"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-row justify-between items-start gap-2 sm:gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer truncate"
                      onClick={() => onSelectCandidate(candidate)}
                    >
                      {candidate.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Applied: {new Date(candidate.applicationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={`${statusColors[candidate.status]} whitespace-nowrap text-xs sm:text-sm`}>
                    {candidate.status}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                  <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                    {candidate.experience} experience
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { window.open(candidate.resumeLink,'_blank') }}
                    className="w-auto order-1 sm:order-2"
                  >
                    <Download size={16} className="mr-2" />
                    <span>Resume</span>
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
