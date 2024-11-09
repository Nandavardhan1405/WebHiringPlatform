import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, Briefcase, MapPin, Calendar } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentJob, setCurrentJob] = useState({ 
    title: "", 
    description: "", 
    candidates: 0,
    department: "",
    location: "",
    postDate: new Date().toISOString().split('T')[0]
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobListings");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem("jobListings", JSON.stringify(jobs));
    }
  }, [jobs]);

  const handleDialogOpen = (job) => {
    setEditMode(!!job);
    setCurrentJob(job ? job : {
      title: "",
      description: "",
      candidates: 0,
      department: "",
      location: "",
      postDate: new Date().toISOString().split('T')[0]
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editMode) {
      setJobs((prev) => prev.map((job) => (job.id === currentJob.id ? currentJob : job)));
    } else {
      setJobs((prev) => [...prev, { ...currentJob, id: uuidv4() }]);
    }
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Postings Dashboard</h1>
          <button
            onClick={() => handleDialogOpen(null)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Add Job</span>
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDialogOpen(job)}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={16} />
                    <span>{job.department || 'Department not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{job.location || 'Location not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} />
                    <span>{job.candidates} candidates</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>{new Date(job.postDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {openDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  {editMode ? "Edit Job Posting" : "Add Job Posting"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={currentJob.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <textarea
                    name="description"
                    placeholder="Job Description"
                    value={currentJob.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={currentJob.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={currentJob.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="number"
                    name="candidates"
                    placeholder="Number of Candidates"
                    value={currentJob.candidates}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="date"
                    name="postDate"
                    value={currentJob.postDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleDialogClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {editMode ? "Save Changes" : "Add Job"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;