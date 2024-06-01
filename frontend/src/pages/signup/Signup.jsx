import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SecondSvg from './SecondSvg';
import ThirdSvg from './ThirdSvg';
import { FourthSvg } from './FourthSvg';
import FirstSvg from './FirstSvg';

const SignUp = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const commonTextSize = {
    fontSize: '1.6rem'
  };

  const onSubmit = async (data) => {
    console.log(data);
    // Perform sign-up action here
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    });

    const json = await response.json();
    console.log(json);

    if (response.status === 200) {
      // Save the auth token and redirect
      localStorage.setItem('token', json);
      navigate('/login');
    } else {
      alert("User with this email already exists or invalid details");
    }
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
              <li className="font-medium text-red-500" style={commonTextSize}>Sign Up</li>
            </ol>
          </nav>
        </div>

        <div className="rounded border-2 border-red-500 bg-white shadow-lg">
          <div className="w-full p-4 sm:p-6 xl:p-10">
            <h2 className="mb-6 text-xl font-bold text-black sm:text-3xl">
              Sign Up to TaskTro
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name.message}</p>
                  )}
                  <span>
                    <SecondSvg />
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                  <span>
                    <ThirdSvg />
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                  )}
                  <span><FourthSvg /></span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block font-medium text-black" style={commonTextSize}>
                  Re-type Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === getValues('password') || 'Passwords do not match',
                    })}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-red-500 focus:ring-0"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600">{errors.confirmPassword.message}</p>
                  )}
                  <span>
                    <FourthSvg />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="submit"
                  value="Create account"
                  className="w-full cursor-pointer rounded-lg border border-red-500 bg-red-500 p-3 text-white transition hover:bg-red-400"
                />
              </div>

              <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-200 p-3 hover:bg-opacity-90 hover:border-red-500">
                Sign up with Google
                <span>
                  <FirstSvg />
                </span>
              </button>

              <div className="mt-4 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-red-500">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
