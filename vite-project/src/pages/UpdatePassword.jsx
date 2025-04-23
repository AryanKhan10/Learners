import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Eye, EyeOff } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authApi';
function UpdatePassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate()
  const{loading} = useSelector(state=>state.auth)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //destructure to contain both in a seperate var
  const { password, confirmPassword } = formData;
  const location = useLocation();
  const dispatch =  useDispatch();

  const [requirements, setRequirements] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
    passwordsMatch: false
  });

  useEffect(() => {
    
    setRequirements({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
      passwordsMatch: password === confirmPassword && password !== ''
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(requirements).every(req => req)) {
      console.log('Password reset successful!');

      // extract token from the url
      const token = location.pathname.split('/').at(-1);
    console.log(token)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
    }
  };

  const RequirementIcon = ({ met }) => (
    met ? 
      <Check className="w-4 h-4 text-green-500" /> : 
      <X className="w-4 h-4 text-red-500" />
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
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
          <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Choose new password</h2>
          <p className="text-gray-400 text-sm mb-6">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                New password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm new password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <RequirementIcon met={requirements.hasUpperCase} />
                  <span className={requirements.hasUpperCase ? 'text-green-500' : 'text-red-500'}>
                    One uppercase character
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RequirementIcon met={requirements.hasLowerCase} />
                  <span className={requirements.hasLowerCase ? 'text-green-500' : 'text-red-500'}>
                    One lowercase character
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RequirementIcon met={requirements.hasNumber} />
                  <span className={requirements.hasNumber ? 'text-green-500' : 'text-red-500'}>
                    One number
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RequirementIcon met={requirements.hasSpecialChar} />
                  <span className={requirements.hasSpecialChar ? 'text-green-500' : 'text-red-500'}>
                    One special character
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RequirementIcon met={requirements.hasMinLength} />
                  <span className={requirements.hasMinLength ? 'text-green-500' : 'text-red-500'}>
                    8 characters minimum
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RequirementIcon met={requirements.passwordsMatch} />
                  <span className={requirements.passwordsMatch ? 'text-green-500' : 'text-red-500'}>
                    Passwords match
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!Object.values(requirements).every(req => req)}
              className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold
                transition-all duration-200 hover:bg-yellow-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Password
            </button>

            <Link
              to={"/login"}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors duration-200 text-sm mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </form>
        </div>
      </div>
        )
      }
    </div>
  );
}

export default UpdatePassword
