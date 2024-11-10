import React, { useState } from "react";
import { Download, ArrowLeft } from "lucide-react";

import { Badge, Button, Select } from "./ind.js";
import { useNavigate } from "react-router-dom";

const CandidateDetailsModal = ({ candidate, onBack, onStatusUpdate }) => {
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  //console.log(candidate);

  const handleStatusUpdate = (newStatus) => {
    onStatusUpdate(candidate.id, newStatus);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const goBack = ()=>{
    onBack();
    navigate(-1);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto w-full p-6">
        <Button
          onClick={()=>{goBack()}}
          variant="secondary"
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </Button>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{candidate.name}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                <p className="mt-1 text-gray-900">{candidate.email}</p>
                <p className="text-gray-900">{candidate.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                <p className="mt-1 text-gray-900">{candidate.experience}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <Select
                value={candidate.status}
                onChange={handleStatusUpdate}
                options={["Under Review", "Interview Scheduled", "Rejected", "Hired"]}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <p className="text-gray-700">{candidate.notes}</p>
            </div>

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>

        {showAlert && (
          <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-green-800">Status updated successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDetailsModal;