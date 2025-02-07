import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const [showPassword, setShowPassword] = useState(false);
      const [errors, setErrors] = useState({
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        // Clear error when user starts typing
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      };
    
      const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
          isValid = false;
        }
    
        // Password validation
        if (!formData.password) {
          newErrors.password = 'Password is required';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Handle form submission
          console.log('Form submitted:', formData);
        }
      };
    
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Welcome Back</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
    
              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <a href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white border ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
    
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                  transform transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Sign In
              </button>
            </form>
    
            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{' '}
              <Link to={'/signup'} className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      );
    }

export default Login
