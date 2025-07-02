import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to ResolveNow
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your platform for submitting and managing complaints efficiently.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 transform hover:-translate-y-1"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 transform hover:-translate-y-1"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 