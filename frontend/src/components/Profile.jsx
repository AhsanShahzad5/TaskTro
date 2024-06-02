import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuthToken } from '../utility/JWTtokenExport';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const token = getAuthToken()

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        }
      });

      const data = await response.json();
      if (response.status === 200) {
        setProfile(data);
        setValue('intro', data.intro);
        setValue('job', data.job);
        setValue('designation', data.designation);
        setValue('company', data.company);
      } else {
        navigate('/create-profile');
      }
    };

    fetchProfile();
  }, [navigate, setValue]);

  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify(data)
    });

    const updatedProfile = await response.json();
    if (response.status === 200) {
      setProfile(updatedProfile);
      setIsEditing(false);
    } else {
      console.error('Failed to update profile');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="mx-auto w-full max-w-screen-lg p-4 md:p-6 2xl:p-10">
        <div className="rounded border-2 border-red-500 bg-white shadow-lg">
          <div className="w-full p-4 sm:p-6 xl:p-10">
            <h2 className="mb-6 text-xl font-bold text-black sm:text-3xl">
              Profile
            </h2>
            {!isEditing ? (
              <div>
                <div className="mb-3">
                  <h3 className="mb-1 block font-medium text-black">
                    <span className="font-bold">Name:</span> {profile.user.name}
                  </h3>
                  <h3 className="mb-1 block font-medium text-black">
                    <span className="font-bold">Email:</span> {profile.user.email}
                  </h3>
                  <p className="mb-1 block font-medium text-black">
                    <span className="font-bold">Introduction:</span> {profile.intro}
                  </p>
                  <p className="mb-1 block font-medium text-black">
                    <span className="font-bold">Job:</span> {profile.job}
                  </p>
                  <p className="mb-1 block font-medium text-black">
                    <span className="font-bold">Designation:</span> {profile.designation}
                  </p>
                  <p className="mb-1 block font-medium text-black">
                    <span className="font-bold">Company:</span> {profile.company}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 w-full cursor-pointer rounded-lg border border-red-500 bg-red-500 p-3 text-white transition hover:bg-red-400"
                >
                  Update
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="mb-1 block font-medium text-black">Introduction</label>
                  <textarea
                    placeholder="Enter your introduction"
                    {...register('intro', { required: 'Introduction is required' })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.intro && (
                    <p className="text-red-600">{errors.intro.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="mb-1 block font-medium text-black">Job</label>
                  <input
                    type="text"
                    placeholder="Enter your job"
                    {...register('job', { required: 'Job is required' })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.job && (
                    <p className="text-red-600">{errors.job.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="mb-1 block font-medium text-black">Designation</label>
                  <input
                    type="text"
                    placeholder="Enter your designation"
                    {...register('designation', { required: 'Designation is required' })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.designation && (
                    <p className="text-red-600">{errors.designation.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="mb-1 block font-medium text-black">Company</label>
                  <input
                    type="text"
                    placeholder="Enter your company"
                    {...register('company', { required: 'Company is required' })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.company && (
                    <p className="text-red-600">{errors.company.message}</p>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-red-500 bg-red-500 p-3 text-white transition hover:bg-red-400"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-200 p-3 hover:bg-opacity-90 hover:border-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
