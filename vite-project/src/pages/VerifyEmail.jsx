import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, sendOTP } from '../services/authApi';
function VerifyEmail() {
    const {loading, signupData } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
    // console.log("signupData ",signupData)
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
    if(!signupData){
        navigate('/signup')
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (index > 0 && verificationCode[index] === '') {
        // If current input is empty, move to previous input
        const newVerificationCode = [...verificationCode];
        inputRefs.current[index - 1].focus();
        newVerificationCode[index - 1] = '';
        setVerificationCode(newVerificationCode);
      } else if (verificationCode[index] !== '') {
        // If current input has value, clear it
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = '';
        setVerificationCode(newVerificationCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newVerificationCode = [...verificationCode];
    
    pastedData.forEach((value, index) => {
      if (index < 6 && /^\d$/.test(value)) {
        newVerificationCode[index] = value;
      }
    });
    
    setVerificationCode(newVerificationCode);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newVerificationCode.findIndex(value => value === '');
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    const {  
      firstName,
      lastName,
      email,
      password, 
      confirmPassword,
      contactNumber, 
      accountType,
    } = signupData;
    e.preventDefault();
    // const otp = verificationCode;
    const code = verificationCode.join('');
    if (code.length === 6) {
      console.log('Verification code:', code);
      // Handle verification here

      dispatch(signup(firstName, lastName, email, password, confirmPassword, contactNumber, accountType, code, navigate))
    }
  };


  return (
    <div>
      {
        loading ? (
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
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Verify email</h2>
          <p className="text-gray-400 text-sm mb-6">
            A verification code has been sent to you. Enter the code below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-semibold text-white bg-gray-700 
                    border border-gray-600 rounded-lg focus:outline-none focus:ring-2 
                    focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!verificationCode.every(digit => digit !== '')}
              className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold
                transition-all duration-200 hover:bg-yellow-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
                focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify email
            </button>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-400 hover:text-gray-300 
                  transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>

              <button
                type="button"
                onClick={()=> dispatch(sendOTP(signupData.email, navigate))}
                className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 
                  transition-colors duration-200"
              >
                <RotateCw className="w-4 h-4" />
                Resend it
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
