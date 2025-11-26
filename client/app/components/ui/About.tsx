"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <div id="about" className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 z-10"></div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-gray-700">Digital Library Visualization</h3>
                  <p className="text-gray-500 mt-2">Organize and manage your books with ease</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 lg:mt-0"
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              About Librora
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Transform Your <span className="text-primary">Reading Experience</span>
            </h2>
            
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Librora is a modern, intuitive application designed to help you manage your personal book collection. 
              Whether you have a few books or a few thousand, Librora makes it easy to organize, track, and discover new books.
            </p>
            
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Our mission is to provide a beautiful and seamless experience for book lovers to connect with their libraries 
              in a new and meaningful way.
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Easy Organization</h3>
                  <p className="text-gray-500">Categorize and sort your books efficiently</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Fast Discovery</h3>
                  <p className="text-gray-500">Find books quickly with search and filters</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;