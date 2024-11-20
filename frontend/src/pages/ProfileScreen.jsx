import React from 'react';
import { Link } from 'react-router-dom';
import { useGetUserProfileQuery } from '../slices/userSlice';
import Loader from "../components/Loader";

const ProfileScreen = () => {

  // getting userData from redux store
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery();

  if (isLoading) return <Loader/>
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-wrap items-center justify-center h-screen">
      <div className="max-w-lg mx-auto mt-10 p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h1>

        {userProfile && (
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex justify-center">
              <img src={userProfile.avatar || 'https://via.placeholder.com/150'} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-primary-500 shadow-md"/>
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-3">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Name:</span> {userProfile.name}
              </p>
              
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Email:</span> {userProfile.email}
              </p>
            </div>
          </div>
        )}

        {/* Button to go back to homepage */}
        <div className="mt-6 text-center">
          <Link to="/" className="btn btn-primary btn-lg px-8 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;