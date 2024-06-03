import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SecondSvg from './signup/SecondSvg';
import ThirdSvg from './signup/ThirdSvg';
import { FourthSvg } from './signup/FourthSvg';
import FirstSvg from './signup/FirstSvg';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const commonTextSize = {
    fontSize: '1.6rem'
  };

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('userId', json.userId);
      navigate('/home');
    } else {
      alert("Invalid credentials");
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
              <li className="font-medium text-red-500" style={commonTextSize}>Login</li>
            </ol>
          </nav>
        </div>

        <div className="rounded border-2 border-red-500 bg-white shadow-lg">
          <div className="w-full p-4 sm:p-6 xl:p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <input
                  type="submit"
                  value="Login"
                  className="w-full cursor-pointer rounded-lg border border-red-500 bg-red-500 p-3 text-white transition hover:bg-red-400"
                />
              </div>

              {/* <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-200 p-3 hover:bg-opacity-90 hover:border-red-500">
                Login with Google
                <span>
                  <FirstSvg />
                </span>
              </button> */}

              <div className="mt-4 text-center">
                <p>
                  New to tasktro?{' '}
                  <Link to="/signup" className="text-red-500">
                    Register
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

export default Login;
