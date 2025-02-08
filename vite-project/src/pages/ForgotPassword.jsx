import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/authApi";
function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("handke",email)

    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`${loading ? "":"max-w-md w-full"} space-y-8`}>
        {loading ? (
          <div className="spinner mx-auto">
          <div></div>   
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
        </div>
        ) : (
          <div className="bg-gray-900 p-8 rounded-lg shadow-md border-[1px] border-gray-800">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
              {emailSent ? "Check Your Email" : "Reset your Password"}
            </h1>
            <p className="text-center text-gray-400 mb-8">
              {emailSent
                ? `We have sent the reset password link to your email ${email}`
                : "We'll email you instructions to reset your password. If you don't have access to your account we can try account recovery"}
            </p>

            <form action="" onSubmit={handleSubmit} className="space-y-6">
              {!emailSent && (
                <>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={email}
                    id="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </>
              )}

              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type = 'submit'>
                {emailSent ? "Reset Email" : "Reset Password"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to={"/login"} className="text-sm text-indigo-600 hover:text-indigo-500">
                <p>Back to Login</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
