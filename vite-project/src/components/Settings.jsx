import { useRef, useState } from 'react'
// import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { EyeIcon, EyeOff, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Buttons from './Home/Buttons'
// import { setUser } from '../slices/profile'
import { updateProfile } from '../services/profile'
import { useNavigate } from 'react-router-dom'
import {updatePersonalInfo} from '../services/profile'
function Settings() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const {user} = useSelector(state =>state.profile)
  const {token} = useSelector(state => state.auth )
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)

  console.log("user ",user)
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth ?? "",
    gender: user?.additionalDetails?.gender ?? "Male",
    contactNumber: user?.additionalDetails?.contactNumber ?? "",
    about: user?.additionalDetails?.about ?? "",
    currentPassword: '',
    newPassword: ''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    console.log(formData)
  }

  const handleSelectClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange =(e) =>{
    const file = e.target.files[0]
    // console.log(file)
    setProfile(file)
  }
  const handleUploadImage = ()=>{
    // dispatch(setUser(selectedImage))
    if(!profile){
      return
    }
    dispatch(updateProfile(profile,token, setLoading))
    setProfile(null)
    // console.log(user)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const {gender, about, dateOfBirth, contactNumber} = formData; 
    console.log("entered")
    dispatch(updatePersonalInfo(gender, about, dateOfBirth, contactNumber, token))
  }
  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto text-white">
    <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>

    {/* Profile Picture Section */}
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
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
        </div> ) : (
          <div className="flex items-center gap-4">
        <img src={user?.image} className='w-[60px] h-[60px] rounded-full border-2 border-blue-700' alt="" />
        <div>
          <p className="text-sm text-gray-400 mb-2">Change Profile Picture</p>
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              name='profile'
            />
            {profile && <p className="text-sm">{profile.name}</p>}
            <button 
              onClick={handleSelectClick}
              className="px-4 py-1 text-sm bg-gray-800 rounded hover:bg-gray-700 transition-colors"
            >
              Select
            </button>
            <button
            type='submit'
              onClick={handleUploadImage} 
              className="flex items-center gap-2 px-4 py-1 text-sm bg-yellow-500 text-black rounded hover:bg-yellow-400 transition-colors">
              Upload
              <Upload className='w-[16px]'/>
            </button>
          </div>
        </div>
      </div>
        )
      }
    </div>

    {/* Profile Information */}
    <form onSubmit={handleFormSubmit} className="bg-gray-900 rounded-lg p-6 mb-6">
      <h2 className="text-xl mb-6">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full text-white bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full text-white bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full text-white bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 cursor-pointer focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full text-white bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 cursor-pointer focus:ring-yellow-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter Contact Number"
            className="w-full text-white bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">About</label>
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Enter Bio Details"
            className="w-full text-white bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        {/* <Buttons type="submit" linkto="/dashboard/profile" active={false} color="text-white">
          Cancel
        </Buttons>
        <Buttons type="submit" linkto="/dashboard/profile" active={true}>
          Save
        </Buttons> */}
        <button type='submit' className='text-white'>Save</button>
      </div>
    </form>

    {/* Password Section */}
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
      <h2 className="text-xl mb-6">Password</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative text-white">
          <label className="block text-sm text-gray-400 mb-2">Current Password</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder="Enter Current Password"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-9"
          >
            {showCurrentPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <div className="relative">
          <label className="block text-sm text-gray-400 mb-2">New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter New Password"
            className="w-full bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-9"
          >
            {showNewPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Buttons linkto="/dashboard/profile" active={false} color="text-white">
          Cancel
        </Buttons>
        <Buttons linkto="/dashboard/profile" active={true}>
          Save
        </Buttons>
      </div>
    </div>

    {/* Delete Account Section */}
    <div className="bg-[#ef444433] rounded-lg p-6 border border-red-500/20">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl text-red-500 mb-2">Delete Account</h3>
          <p className="text-gray-400 text-sm mb-4">
            Would you like to delete account?<br />
            This account may contain Paid Courses. Deleting your account is permanent and will remove all the content associated with it.
          </p>
          <button className="text-red-500 text-sm hover:text-red-400">
            I want to delete my account
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Settings
