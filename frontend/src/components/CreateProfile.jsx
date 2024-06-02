import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utility/JWTtokenExport';

const CreateProfile = ({ name, email }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const token = getAuthToken()

  useEffect(() => {
    // Set the default values for name and email from props
    setValue('name', name);
    setValue('email', email);
  }, [name, email, setValue]);

  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'auth-token': token,
      },
      body: JSON.stringify(data)
    });

    if (response.status === 200) {
      navigate('/home');
    } else {
      alert('Failed to create profile');
    }
  };

  const commonTextSize = {
    fontSize: '1.6rem'
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="mx-auto w-full max-w-screen-lg p-4 md:p-6 2xl:p-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium text-red-500" style={commonTextSize} to="/">
                  Dashboard /
                </Link>
              </li>
              <li className="font-medium text-red-500" style={commonTextSize}>Create Profile</li>
            </ol>
          </nav>
        </div>

        <div className="rounded border-2 border-red-500 bg-white shadow-lg">
          <div className="w-full p-4 sm:p-6 xl:p-10">
            <h2 className="mb-6 text-xl font-bold text-black sm:text-3xl">
              Create Your Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full rounded-lg border border-gray-300 bg-gray-200 py-3 pl-6 pr-10 text-black outline-none"
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full rounded-lg border border-gray-300 bg-gray-200 py-3 pl-6 pr-10 text-black outline-none"
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Introduction
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Enter your introduction"
                    {...register('intro', { required: 'Introduction is required' })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.intro && (
                    <p className="text-red-600">{errors.intro.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Current Job
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your current job"
                    {...register('job', { required: 'Job is required' })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.job && (
                    <p className="text-red-600">{errors.job.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Designation
                </label>
                <div className="relative">
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
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Company
                </label>
                <div className="relative">
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
              </div>

              <div className="mb-4">
                <input
                  type="submit"
                  value="Create Profile"
                  className="w-full cursor-pointer rounded-lg border border-red-500 bg-red-500 p-3 text-white transition hover:bg-red-400"
                />
              </div>

              <Link to="/home" className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-200 p-3 hover:bg-opacity-90 hover:border-red-500">
                Skip for now
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
