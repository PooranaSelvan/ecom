'use client'

import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/userSlice';
import { setCredentials } from '../slices/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // destructing
  const [loginApiCall, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if(email === "" || password === ""){
      toast("Please Enter Email or Password..")
    } else{
      try{
        const res = await loginApiCall({ email, password }).unwrap();
        // console.log(res);

        dispatch(setCredentials({...res})); // sending to setCredentials
        toast.success("Logged In Successfully..");
        navigate("/");
      } catch(err){
        toast.error(err.data.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center">Welcome back</h2>
          <p className="text-center text-base-content/70">Please sign in to your account</p>
          <form onSubmit={handleSubmit} className="form-control gap-4">
            <div>
              <label className="label" htmlFor="email-address">
                <span className="label-text">Email address</span>
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className="input input-bordered w-full"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="input input-bordered w-full pr-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-base-content/70" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-base-content/70" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-end">
              <a href="#" className="link link-primary">Forgot your password?</a>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Sign in
            </button>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p className="text-base-content/70">
              {"Don't have an account? "}
              <a href="#" className="link link-primary">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}