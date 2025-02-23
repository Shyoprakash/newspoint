import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mantine/core';
import { X, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProfileDropDown from "./ProfileDropDown";

const navItems = ['Home', 'Categories', 'Channels', 'About'];

const NavLinks = ({ onClick }) => (
  <>
    {navItems.map((item) => (
      <motion.li
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        key={item}
        className="hover:text-gray-700"
        onClick={onClick}
      >
        <Link to={`/${item.toLowerCase()}`}>{item}</Link>
      </motion.li>
    ))}
  </>
);

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);

  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <nav className="h-16 p-4 sticky top-0 z-50 bg-white backdrop-blur-md opacity-80">
      <div className="flex mx-6 items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold"
        >
          NewsPoint
        </motion.h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4">
          <NavLinks />
        </ul>

        <div className="flex space-x-4 items-center">
          {!authenticated ? (
            <div className="flex gap-4">
              <Link to="/login" className="hidden md:block">
                <Button variant="white" size="xs">Login</Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button variant="white" size="xs">Register</Button>
              </Link>
            </div>
          ) : (
            <ProfileDropDown />
          )}

          {/* Mobile Menu Button */}
          <button onClick={handleClick} className="md:hidden" aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col mt-4 space-y-2"
          >
            <ul className="flex flex-col gap-2">
              <NavLinks onClick={() => setIsOpen(false)} />
            </ul>
            {!authenticated && (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="white">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="white">Register</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
