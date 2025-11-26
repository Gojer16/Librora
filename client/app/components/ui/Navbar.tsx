"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state for navbar styling
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "features"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className={`text-2xl font-bold transition-all duration-300 ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              Librora
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link
                href="#home"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === "home" 
                    ? (isScrolled ? "text-primary bg-white/80" : "text-white bg-white/20") 
                    : (isScrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white")
                }`}
              >
                Home
                {activeSection === "home" && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white/20" 
                    layoutId="navIndicator" 
                  />
                )}
              </Link>
              <Link
                href="#about"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === "about" 
                    ? (isScrolled ? "text-primary bg-white/80" : "text-white bg-white/20") 
                    : (isScrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white")
                }`}
              >
                About
                {activeSection === "about" && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white/20" 
                    layoutId="navIndicator" 
                  />
                )}
              </Link>
              <Link
                href="#features"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === "features" 
                    ? (isScrolled ? "text-primary bg-white/80" : "text-white bg-white/20") 
                    : (isScrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white")
                }`}
              >
                Features
                {activeSection === "features" && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white/20" 
                    layoutId="navIndicator" 
                  />
                )}
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Link
                href="/login"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-600 hover:text-primary" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;