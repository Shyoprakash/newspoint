import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@mantine/core';

const Reg = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [isEyeOpen2, setIsEyeOpen2] = useState(false);

    const handleEyeClick = () => {
        setIsEyeOpen(!isEyeOpen);
    };

    const handleEyeClick2 = () => {
        setIsEyeOpen2(!isEyeOpen2);
    };

    const handleReg = async (e) => {
        e.preventDefault(); // Prevent form auto-submit

        if (!name || !email || !password || !confirmPassword) {
            return alert("❌ All fields are required!");
        }

        if (password !== confirmPassword) {
            return alert("❌ Passwords do not match!");
        }

        const formdata = { name, password, email };

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });

            const data = await res.json();

            if (res.status === 409) {
                alert("User already exists! Try logging in.");
            } else if (res.status === 201) {
                console.log("✅ User Registered:", data);
                setMessage("Successfully registered!");
            } else {
                console.error("❌ Error:", data.message);
            }
        } catch (error) {
            console.error("❌ Network Error:", error);
        }
    };

    return (
        <div className='bg-gray-100 h-screen flex justify-center items-center'>
            <motion.div 
                className='mx-w-md bg-white rounded-xl p-4 shadow-md' 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.6 }}
            >
                <h1 className='text-center mb-5 text-2xl font-bold '>Registration</h1>

                <form className='space-y-8 w-96' onSubmit={handleReg}>
                    <div className="relative flex gap-2">
                        <User className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            placeholder='Enter username..' 
                            className="pl-10 focus:outline-none border-b border-gray-200 w-full" 
                        />
                    </div>

                    <div className="relative flex gap-2">
                        <Mail className='text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2' />
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            placeholder='Enter email..' 
                            className="pl-10 focus:outline-none border-b border-gray-200 w-full" 
                        />
                    </div>

                    <div className='flex gap-2 relative'>
                        <Lock className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <div onClick={handleEyeClick} className='absolute right-2 cursor-pointer'>
                            {isEyeOpen ? <Eye /> : <EyeOff />}
                        </div>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type={isEyeOpen ? "text" : "password"} 
                            placeholder='Enter password..' 
                            className="pl-10 focus:outline-none border-b border-gray-200 w-full" 
                        />
                    </div>

                    <div className='flex gap-2 relative'>
                        <Lock className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <div onClick={handleEyeClick2} className='absolute right-2 cursor-pointer'>
                            {isEyeOpen2 ? <Eye /> : <EyeOff />}
                        </div>
                        <input 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            type={isEyeOpen2 ? "text" : "password"} 
                            placeholder='Confirm password..' 
                            className="pl-10 focus:outline-none border-b border-gray-200 w-full" 
                        />
                    </div>

                    {message && <p className="text-green-600 text-center">{message}</p>}

                    <Button fullWidth type="submit">Register</Button>
                </form>
            </motion.div>
        </div>
    );
};

export default Reg;
