"use client";
import React from "react";
import { motion } from "framer-motion";
import BookIcon from "../icons/BookIcon";
import ChartIcon from "../icons/ChartIcon";
import SearchIcon from "../icons/SearchIcon";
import UsersIcon from "../icons/UsersIcon";

const features = [
  {
    name: "Add and Organize Books",
    description: "Easily add books to your digital library. Organize them by genre, author, or status (e.g., read, currently reading, want to read).",
    icon: <BookIcon />,
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    name: "Track Your Reading Progress",
    description: "Keep track of your reading progress for each book. Set goals and see how much you've read over time.",
    icon: <ChartIcon />,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    name: "Discover New Books",
    description: "Get personalized book recommendations based on your reading history and preferences. Discover your next favorite book.",
    icon: <SearchIcon />,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    name: "Community and Reviews",
    description: "Connect with other book lovers. Share your thoughts on books by writing reviews and rating them.",
    icon: <UsersIcon />,
    color: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
];

const Features = () => {
  return (
    <div id="features" className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful tools for <span className="text-primary">book lovers</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Librora provides a comprehensive set of features to help you get the most out of your reading experience.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex flex-col h-full bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 p-6">
                  <div className={`flex items-center justify-center h-14 w-14 rounded-xl ${feature.color} ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-base text-gray-600 flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <div className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-1 transition-all duration-300">
                      Learn more
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;