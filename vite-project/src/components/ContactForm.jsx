import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import apiConnector from "../services/apiConnector";
import { countries } from '../data/CountryCode';
function ContactForm() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState : {errors, isSubmitSuccessful}
    } = useForm();

    const submitForm = async (data) => {
        setLoading(true);
        try {
            // const res = await apiConnector("POST", )
            console.log(data)
        } catch (error) {
            console.log("erorr.", error)
        }
        setLoading(false);

    }
    useEffect(()=>{

        // reset form on submit
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                email:"",
                phoneNo:"",
                message:""

            })
        }
    }, [reset, isSubmitSuccessful])

  return (
    <div>
      <form  className="space-y-6 border-[0.4px] border-gray-800 p-10 rounded-3xl" onSubmit={handleSubmit(submitForm)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id='firstName'
                  name="firstName"
                //   value={formData.firstName}
                //   onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("firstName",{required: true})}
                />
                {
                    errors.firstName && (
                        <span className="text-red-500 font-mono text-sm">Please enter your first name</span>
                    )
                }
              </div>
              <div>
                <input
                  type="text"
                  id='lastName'
                  name="lastName"
                //   value={formData.lastName}
                //   onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("lastName")}

                />
                {/* {
                    errors.firstName && (
                        <span>Please enter your first name</span>
                    )
                } */}
              </div>
            </div>

            <div>
              <input
                type="email"
                id='email'
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                placeholder="Enter email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("email",{required: true})}

              />
                {
                    errors.email && (
                        <span className="text-red-500 font-mono text-sm">Please enter your email address</span>
                    )
                } 
            </div>

            <div className="flex gap-4">
              <select
                className="w-24 px-3 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("CountryCode",{required:true})}
              >

                {
                    countries.map((elem, index)=> 
                         <option key={index} value={elem.code}>{elem.code}- {elem.name}</option>
                    )
                }
                {/* <option>+91</option>
                <option>+1</option>
                <option>+44</option>
                <option>+61</option> */}
              </select>
              <input
                type="tel"
                id='phone'
                name="phone"
                // value={formData.phone}
                // onChange={handleChange}
                placeholder="12345-67890"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("phoneNo",{
                    required: {value:true, message: "\nPlease enter your phone number"},
                    maxLength: {value:10, message: "Invalid phone number"},
                    minLength:{value:8, message:"Invalid phone number"}
                })}
                
              />
              {
                    errors.phoneNo && (
                        <span className="text-red-500 font-mono text-sm">{errors.phoneNo.message}</span>
                    )
                }
            </div>

            <div>
              <textarea
                name="message"
                // value={""}
                // onChange={}
                placeholder="Enter your message here"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                {...register("message",{required: true})}

              ></textarea>
                {
                    errors.message && (
                        <span className="text-red-500 font-mono text-sm">Please describe your concern</span>
                    )
                }
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
    </div>
  )
}

export default ContactForm
