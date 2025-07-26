import React, { useState } from 'react';
import {ShipWheelIcon} from 'lucide-react'
import {Link } from 'react-router'
import useSignup from '../hooks/useSignup';

const SignupPage = () => {

  const [signupData, setsignupData] = useState({ fullName: '', email: '', password: '' });

  const {signupMutation, isPending, error} = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  
  


  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme='forest'>
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

        {/* Signup form - left side  */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>StreamChat</span>
          </div>

          {/* Error message if any */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>

              <div className='space-y-4 mb-4'>
                  <h2 className='text-xl font-semibold'>Create an Account</h2>
                  <p className='text-sm opacity-70'>
                    Join StreamChat and start your language adventure!
                  </p>
              </div>

              <div className='space-y-3 '>
                <div className='form-control w-full'>
                  <label htmlFor="" className='label'>
                    <span className='label-text'>Full Name</span>
                  </label>

                  <input type="text" 
                    placeholder='Your Name'
                    className='input input-bordered w-full'
                    value={signupData.fullName}
                    onChange={(e) => setsignupData({...signupData, fullName: e.target.value})}
                    required
                  />
                </div>

                <div className='form-control w-full'>
                  <label htmlFor="" className='label'>
                    <span className='label-email'>Email</span>
                  </label>

                  <input type="email" 
                    placeholder='Your email'
                    className='input input-bordered w-full'
                    value={signupData.email}
                    onChange={(e) => setsignupData({...signupData, email: e.target.value})}
                    required
                  />
                </div>

                <div className='form-control w-full'>
                  <label htmlFor="" className='label'>
                    <span className='label-text'>Enter password</span>
                  </label>

                  <input type="password" 
                    placeholder='******'
                    className='input input-bordered w-full'
                    value={signupData.password}
                    onChange={(e) => setsignupData({...signupData, password: e.target.value})}
                    required
                  />
                  <p className='text-xs opacity-70 mt-1'>Password must be atleast 6 characters long</p>
                </div>

                <div className='form-control'>
                  <label htmlFor="" className='label cursor-pointer gap-2 justify-start'>
                    <input type="checkbox" className='checkbox checkbox-sm' required />
                    <span className='text-xs leading-tight'>
                      I agree to the{" "}
                      <span className='text-primary hover:underline'>Terms of service</span>
                    </span>
                  </label>
                </div>
              </div>

              <button className='btn btn-primary w-full' type='submit' >{isPending ? (
                <>
                  <span className='loading loading-spinner loading-xs'>Loading...</span>
                </>
              ) : 'Create an Account'}</button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to='/login'
                    className='text-primary hover:underline'  
                  >
                    Sign In
                  </Link>

                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side */}

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/signupHero.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
        </div>

        </div>

      </div>
    </div>
  );
}

export default SignupPage;
