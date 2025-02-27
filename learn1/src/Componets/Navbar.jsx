import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { X, Menu, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProfileDropDown from './ProfileDropDown';

function Navbar() {
  const { authenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-opacity-80 bg-white h-14  border-b border-b-gray-200 backdrop-blur-md p-4 text-black sticky top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-2 relative">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold"
        >
          NewsAI
        </motion.h1>

        <ul className="hidden md:flex space-x-6 absolute left-1/2 -translate-x-1/2">
          {['Home', 'Categories', 'Channels', 'About'].map((item) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              key={item}
              className="hover:text-gray-700 text-sm"
            >
              <Link
                className="text-md font-semibold tracking-wider"
                to={`/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center space-x-4 ml-auto">
          {authenticated && (
            <div className="flex items-center gap-4">
              <button className="relative text-gray-600 hover:text-gray-800">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  4
                </span>
              </button>

              <ProfileDropDown />
            </div>
          )}

          {!authenticated && (
            <div className="flex gap-6">
              <Link to="/login" className="hidden md:block">
                <Button variant="white" size="xs">
                  Login
                </Button>
              </Link>

              <Link to="/register" className="hidden md:block">
                <Button variant="white" size="xs">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            onClick={handleClick}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white p-4 shadow-md rounded-lg mx-4 mt-2"
        >
          <ul className="space-y-4 text-center">
            {['Home', 'Categories', 'Channels', 'About'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="block hover:text-gray-700"
                >
                  {item}
                </Link>
              </motion.li>
            ))}
            <li>
              <Link to="/login" className="block hover:text-gray-700">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="block hover:text-gray-700">
                Register
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;