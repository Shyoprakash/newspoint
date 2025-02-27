import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CircleCheckBig } from 'lucide-react';
import { Button } from '@mantine/core';
import {Slide} from 'react-awesome-reveal'
import { setPreferences } from '../redux/slice/newsSlice';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import './preferenc.css'


function Preferences() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState([]);
  const dispatch = useDispatch()
  const categories = [
    'Technology',
    'Sports',
    'Health',
    'Entertainment',
    'Business',
    'Politics',
  ];
  console.log(selectedCategory);

  const toggleCategory = (category) => {
    setSelectedCategory(
      selectedCategory.includes(category)
        ? selectedCategory.filter((c) => c !== category)
        : [...selectedCategory, category]
    );
 
  };

  const handleSavePreferences = async() => {
    await dispatch(setPreferences({preferences : selectedCategory}))
     navigate('/')
   }

  return (
    <Slide>
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div>
        <h1 className="text-gray-800 font-semibold text-2xl">
          Select Interests
        </h1>
      </div>

      <div className=" card p-6 grid mt-6 grid-cols-2 sm:grid-cols-3 gap-6">
      {categories.map((category) => (
  <motion.div
    key={category}  // ✅ Yahan key add kiya
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ duration: 0.5 }}
    onClick={() => toggleCategory(category)}
    className={`shadow-md rounded-xl flex justify-center items-center gap-4 text-center px-5 py-3 ${
      selectedCategory.includes(category) ? 'bg-blue-500 text-white' : 'bg-white text-black'
    }`}
  >
    {selectedCategory.includes(category) && <CircleCheckBig />}
    {category}
  </motion.div>
))}

        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </div>
    </div>
    </Slide>
  );
}

export default Preferences;