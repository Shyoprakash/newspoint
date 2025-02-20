import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User} from 'lucide-react';
import { Button } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { SignUp } from '../redux/slice/authSlice'
import { useDispatch , useSelector } from 'react-redux'
import { Loader } from '@mantine/core';

const Reg = () => {
    const [isEyeClick, setIsEyeClick] = useState(false);
    const [isEyeClicks, setIsEyeClicks] = useState(false);

    const handleEyeClick = () => {
        setIsEyeClick(!isEyeClick);
    };
    const handleEyeClicks = () => {
        setIsEyeClicks(!isEyeClicks);
    };


    const Dispatch = useDispatch()
    const {loading} = useSelector((state)=>state.auth)

    const { register , handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        Dispatch(SignUp(data))
        
    }

    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-96 rounded-2xl p-6 shadow-md bg-white"
            >
                <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
                <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2 relative  ">
                        <User className="text-gray-500 absolute left-2" />
                        <input
                            type="text"
                            name="name"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Full Name"
                            required
                            {...register("name")}
                        />
                    </div>
                    <div className="flex gap-2 relative  ">
                        <Mail className="text-gray-500 absolute left-2" />
                        <input
                            type="email"
                            name="email"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Email..."
                            {...register("email")}
                        />
                    </div>
                    <div className="flex gap-2 relative ">
                        <Lock className="text-gray-500 absolute left-2" />
                        <div onClick={handleEyeClick} className="absolute right-2">
                            {isEyeClick ? <Eye className='text-gray-400' /> : <EyeOff className='text-gray-400' />}
                        </div>

                        <input
                            type={isEyeClick ? 'text' : 'password'}
                            name="password"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Password..."
                            {...register("password")}
                        />
                    </div>

                    <div className="flex gap-2 relative ">
                        <Lock className="text-gray-500 absolute left-2" />
                        <div onClick={handleEyeClicks} className="absolute right-2">
                            {isEyeClicks ? <Eye className='text-gray-400' /> : <EyeOff className='text-gray-400' />}
                        </div>

                        <input
                            type={isEyeClicks ? 'text' : 'password'}
                            name="confirmPassword"
                            className="focus:outline-none w-full border-b border-gray-300 pl-10"
                            placeholder="Enter Confirm Password..."
                            {...register("confirmPassword")}
                        />
                    </div>
                    


                    <p className='text-sm'>By signing up, you agree to our <a href="/terms" className='text-blue-400'>Terms</a>, <a href="/privacy" className='text-blue-400'>Privacy Policy</a> and <a href="/policy" className='text-blue-400'>Cookies Policy</a>.</p>
                    <Button type='submit' fullWidth>{ loading ? <Loader size={16} color='white'/> : 'SignUp' }</Button>
                    <p className='flex justify-center'>Have an account? <a href="/login" className='text-blue-500'>Log in</a></p>
                </form>
            </motion.div>
        </div>
    )
}

export default Reg





// import React, { useState } from 'react';
// import { motion } from 'framer-motion'; // 🛠️ Correct import (motion/react nahi hota)
// import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
// import { Button, Loader } from '@mantine/core';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { SignUp } from '../redux/slice/authSlice';

// const Reg = () => {
//   const [isEyeOpen, setIsEyeOpen] = useState(false);
//   const [isEyeOpen2, setIsEyeOpen2] = useState(false);

//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.auth);
//   const { register, handleSubmit, reset } = useForm();

//   const handleEyeClick = () => setIsEyeOpen(!isEyeOpen);
//   const handleEyeClick2 = () => setIsEyeOpen2(!isEyeOpen2);

//   const onSubmit = async (data) => {
//     const result = await dispatch(SignUp(data)); // 🚀 Dispatch with clean error handling

//     if (SignUp.rejected.match(result)) {
//       console.log("Signup Failed:", result.payload);  // ✅ Error payload clean hoga
//     } else {
//       console.log("Signup Successful:", result.payload);
//       reset(); // ✅ Form reset on success
//     }
//   };

//   return (
//     <div className='bg-gray-100 h-screen flex justify-center items-center'>
//       <motion.div
//         className='max-w-md bg-white rounded-xl p-4 shadow-md'
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className='text-center mb-5 text-2xl font-bold'>Registration</h1>

//         <form className='space-y-8 w-96' onSubmit={handleSubmit(onSubmit)}>
//           {/* Username Field */}
//           <div className="relative flex gap-2">
//             <User className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <input
//               {...register("name", { required: "Username is required" })}
//               type="text"
//               placeholder='Enter username..'
//               className="pl-10 focus:outline-none border-b border-gray-200 w-full"
//             />
//           </div>

//           {/* Email Field */}
//           <div className="relative flex gap-2">
//             <Mail className='text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2' />
//             <input
//               {...register("email", { required: "Email is required" })}
//               type="email"
//               placeholder='Enter email..'
//               className="pl-10 focus:outline-none border-b border-gray-200 w-full"
//             />
//           </div>

//           {/* Password Field */}
//           <div className='flex gap-2 relative'>
//             <Lock className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <div onClick={handleEyeClick} className='absolute right-2 cursor-pointer'>
//               {isEyeOpen ? <Eye /> : <EyeOff />}
//             </div>
//             <input
//               type={isEyeOpen ? "text" : "password"}
//               placeholder='Enter password..'
//               {...register("password", { required: "Password is required" })}
//               className="pl-10 focus:outline-none border-b border-gray-200 w-full"
//             />
//           </div>

//           {/* Confirm Password Field */}
//           <div className='flex gap-2 relative'>
//             <Lock className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <div onClick={handleEyeClick2} className='absolute right-2 cursor-pointer'>
//               {isEyeOpen2 ? <Eye /> : <EyeOff />}
//             </div>
//             <input
//               type={isEyeOpen2 ? "text" : "password"}
//               placeholder='Confirm password..'
//               {...register("confirmPassword", { required: "Confirm password is required" })}
//               className="pl-10 focus:outline-none border-b border-gray-200 w-full"
//             />
//           </div>

//           {/* Submit Button */}
//           <Button fullWidth type="submit">
//             {loading ? <Loader size={16} color="white" /> : 'Signup'}
//           </Button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-500 font-medium">
//             Sign In
//           </a>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Reg;
