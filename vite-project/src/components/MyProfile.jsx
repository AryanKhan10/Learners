import { Edit } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';

function MyProfile() {
    const {user} = useSelector(state => state.profile);
    const navigate = useNavigate();

    return (
        <div className='ml-4 md:ml-4 max-w-3xl mx-auto p-6 space-y-8'>
            <h1 className='text-3xl font-bold text-white mb-8'>
                My Profile
            </h1>

            {/* Profile Section */}
            <div className='bg-gray-800/40 border-[1px] border-[#1d436a] rounded-lg p-6 shadow-lg'>
                <div className='flex flex-col items-start justify-between'>
                    <div className='flex w-full justify-between items-center gap-4 text-white'>
                        { user.image ? (
                            <img 
                            className='rounded-full w-[60px] h-[60px] object-cover border-2 border-blue-400'
                            src={user?.image} 
                            alt={`profile ${user?.firstName}`}
                        />):(
                            <Avatar name={`${user.firstName} ${user.lastName}`} className='rounded-full w-[60px] h-[60px]  object-cover ' />
                        )
                        }
                        

                        <button 
                            onClick={() => navigate('/dashboard/settings')}
                            className='flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200'
                        >
                            <span>Edit</span>
                            <Edit className='w-4 h-4' />
                        </button>
                    </div>
                        <div  className='text-white'>
                            <p className='text lg sm:text-xl font-semibold'>{user?.firstName} {user?.lastName}</p>
                            <p className='text-sm sm:text-base text-gray-400'>{user?.email}</p>
                        </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-gray-800/40 border-[1px] border-[#1d436a] rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <p className='text lg sm:text-xl font-semibold text-white'>About</p>
                    <button 
                        onClick={() => navigate('/dashboard/settings')}
                        className='flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200'
                    >
                        <span>Edit</span>
                        <Edit className='w-4 h-4' />
                    </button>
                </div>
                <p className='text-gray-400'>
                    {user?.additionalDetails?.about ?? "Write something about yourself"}
                </p>
            </div>

            {/* Personal Details Section */}
            <div className="bg-gray-800/40 border-[1px] border-[#1d436a] rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <p className='text lg sm:text-xl font-semibold text-white'>Personal Details</p>
                    <button 
                        onClick={() => navigate('/dashboard/settings')}
                        className='flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200'
                    >
                        <span>Edit</span>
                        <Edit className='w-4 h-4' />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="First Name" value={user?.firstName} />
                    <DetailItem label="Last Name" value={user?.lastName} />
                    <DetailItem label="Email" value={user?.email} />
                    <DetailItem 
                        label="Contact" 
                        value={user?.additionalDetails?.contactNumber ?? "Add contact number"} 
                    />
                    <DetailItem 
                        label="Gender" 
                        value={user?.additionalDetails?.gender ?? "Add gender"} 
                    />
                    <DetailItem 
                        label="Date of Birth" 
                        value={user?.additionalDetails?.dateOfBirth ?? "Add date of birth"} 
                    />
                </div>
            </div>
        </div>
    )
}

// Helper component for detail items
const DetailItem = ({ label, value }) => (
    <div className="space-y-1">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xs sm:text-base text-white font-medium">{value}</p>
    </div>
)

export default MyProfile