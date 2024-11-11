import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Users, Calendar, Search, X } from "lucide-react";

const JobDashboard = () => {
  const navigate = useNavigate();

  // Sample candidate data generator
  const generateRandomCandidates = () => {
    const skills = [
      ["React", "JavaScript", "TypeScript"],
      ["Node.js", "Python", "MongoDB"],
      ["Java", "Spring", "SQL"],
      ["Angular", "Vue", "CSS"],
      ["PHP", "Laravel", "MySQL"],
    ];

    const statuses = [
      "Under Review",
      "Interview Scheduled",
      "Hired",
      "Rejected",
    ];
    const numCandidates = Math.floor(Math.random() * 5) + 1; // 1-5 candidates

    return Array.from({ length: numCandidates }, (_, index) => ({
      id: Date.now() + index,
      name: `Candidate ${index + 1}`,
      email: `candidate${index + 1}@example.com`,
      phone: `555-${String(Math.floor(Math.random() * 10000)).padStart(
        4,
        "0"
      )}`,
      experience: `${Math.floor(Math.random() * 10) + 1} years`,
      skills: skills[Math.floor(Math.random() * skills.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      applicationDate: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      notes: "Candidate application under review.",
      resumeLink:'https://drive.google.com/file/d/17txR2R_AhTgD-tFvEe_11-LK5TDab9IB/view?usp=drivesdk'
    }));
  };

  // Initial sample data
  const initialJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      description:
        "Looking for an experienced Frontend Developer with React expertise.",
      postDate: "2024-01-15",
      assignments: [],
      candidates: generateRandomCandidates(),
    },
    {
      id: "2",
      title: "Backend Developer",
      description:
        "Seeking a Backend Developer with Node.js and MongoDB experience.",
      postDate: "2024-01-20",
      assignments: [],
      candidates: generateRandomCandidates(),
    },
  ];

  // Initialize state with data from localStorage or initial sample data
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs")
    if (savedJobs) {
      return JSON.parse(savedJobs)
    }
    else {
      localStorage.setItem("jobs", JSON.stringify(initialJobs));
      return initialJobs;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentJob, setCurrentJob] = useState({
    title: "",
    description: "",
    postDate: new Date().toISOString().split("T")[0],
    assignments:[],
    candidates: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddJob = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setCurrentJob({
      title: "",
      description: "",
      postDate: new Date().toISOString().split("T")[0],
      assignments:[],
      candidates: [],
    });
  };

  const handleEditJob = (job) => {
    setCurrentJob(job);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  const handleSaveJob = () => {
    if (!currentJob.title || !currentJob.description) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditing) {
      setJobs(jobs.map((job) => (job.id === currentJob.id ? currentJob : job)));
    } else {
      const newCandidates = generateRandomCandidates();
      const newJob = {
        ...currentJob,
        id: Date.now().toString(),
        candidates: newCandidates,
        createdAt: new Date().toISOString(),
      };
      setJobs([...jobs, newJob]);
    }
    setIsModalOpen(false);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title &&
        job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.description &&
        job.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-gray-800">Job Postings</h1>
          <button
            onClick={handleAddJob}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            <Plus size={20} />
            Add New Job
          </button>
        </div>

        {/* Search Section */}
        <div className="relative mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search jobs by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="container mx-auto px-4 py-6">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] cursor-default"
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <h2
                  className="text-lg sm:text-xl font-bold text-gray-800 hover:text-indigo-600 cursor-pointer truncate flex-1"
                  onClick={() => navigate(`/candidates/${job.id}`)}
                >
                  {job.title}
                </h2>
                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                    aria-label="Edit job"
                  >
                    <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    aria-label="Delete job"
                  >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                  <Users className="text-indigo-500 w-4 h-4 sm:w-[16px] sm:h-[16px]" />
                  <span>{job.candidates?.length || 0} candidates</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                  <Calendar className="text-indigo-500 w-4 h-4 sm:w-[16px] sm:h-[16px]" />
                  <span>{new Date(job.postDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 transform transition-all">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditing ? "Edit Job Posting" : "Create New Job Posting"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentJob.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. Senior Frontend Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={currentJob.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter job description..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post Date
                  </label>
                  <input
                    type="date"
                    name="postDate"
                    value={currentJob.postDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveJob}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
                >
                  {isEditing ? "Save Changes" : "Create Job"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;
