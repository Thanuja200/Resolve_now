import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]); // For admin view (all complaints)
  const [userComplaints, setUserComplaints] = useState([]); // For user's own complaints
  const [showUserComplaints, setShowUserComplaints] = useState(false); // To toggle user complaints view
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electricity',
    priority: 'Medium'
  });

  // Fetch user data and complaints on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userInfo'));
        if (!userData) {
          navigate('/login');
          return;
        }
        setUser(userData);
        
        // Only fetch all complaints if user is admin
        if (userData.role === 'admin') {
          await fetchAllComplaints();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchAllComplaints = async () => {
    try {
      const response = await axios.get('/complaints');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching all complaints:', error);
      toast.error(error.message || 'Error loading all complaints');
    }
  };

  const fetchCurrentUserComplaints = async () => {
    setSubmitting(true); // Reusing submitting for loading state during fetch
    try {
      const response = await axios.get('/complaints/my');
      setUserComplaints(response.data);
      setShowUserComplaints(true); // Show user complaints section
    } catch (error) {
      console.error('Error fetching user complaints:', error);
      toast.error(error.message || 'Error loading your complaints');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post('/complaints', formData);
      toast.success('Complaint submitted successfully');
      
      // Clear form
      setFormData({
        title: '',
        description: '',
        category: 'Electricity',
        priority: 'Medium'
      });
      
      // Only refresh all complaints list if user is admin
      if (user?.role === 'admin') {
        await fetchAllComplaints();
      }
      // If user is not admin, but viewing their own complaints, refresh their list
      if (user?.role !== 'admin' && showUserComplaints) {
        await fetchCurrentUserComplaints();
      }

    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error(error.message || 'Error submitting complaint');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="max-w-4xl w-full">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Submit your complaints here
          </p>
        </div>

        {/* Complaint Submission Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Submit New Complaint
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Enter complaint title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Describe your complaint in detail"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                >
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Road">Road</option>
                  <option value="Internet">Internet</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  id="priority"
                  name="priority"
                  required
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-md text-base font-medium text-white transition ease-in-out duration-150 transform hover:-translate-y-0.5 hover:scale-105 ${
                  submitting
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Conditional button for user complaints */}
        {user && user.role !== 'admin' && (
          <div className="text-center mb-8">
            <button
              onClick={fetchCurrentUserComplaints}
              disabled={submitting}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white transition ease-in-out duration-150 transform hover:-translate-y-0.5 hover:scale-105 ${
                submitting
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            >
              {submitting ? 'Loading Your Complaints...' : 'View Your Complaints'}
            </button>
          </div>
        )}

        {/* Complaints List (Admin Only) */}
        {user?.role === 'admin' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              All Complaints
            </h2>
            {complaints.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No complaints found</p>
            ) : (
              <div className="space-y-6">
                {complaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {complaint.title}
                      </h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        complaint.priority === 'High'
                          ? 'bg-red-100 text-red-800'
                          : complaint.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">
                      {complaint.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                      <span>Category: <span className="font-medium text-gray-700">{complaint.category}</span></span>
                      <span>Submitted by: <span className="font-medium text-gray-700">{complaint.name} ({complaint.email})</span></span>
                      <span>Date: <span className="font-medium text-gray-700">{new Date(complaint.createdAt).toLocaleDateString()}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User's Complaints List */}
        {user && user.role !== 'admin' && showUserComplaints && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Submitted Complaints
            </h2>
            {userComplaints.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No complaints submitted yet.</p>
            ) : (
              <div className="space-y-6">
                {userComplaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {complaint.title}
                      </h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        complaint.priority === 'High'
                          ? 'bg-red-100 text-red-800'
                          : complaint.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">
                      {complaint.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                      <span>Category: <span className="font-medium text-gray-700">{complaint.category}</span></span>
                      <span>Date: <span className="font-medium text-gray-700">{new Date(complaint.createdAt).toLocaleDateString()}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard; 