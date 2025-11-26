
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Book from "./Book";
import FloatingShapes from "./FloatingShapes";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 w-full h-screen overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            New: Community features now available
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block">Welcome to</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Librora
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl mx-auto">
            The ultimate solution for managing your personal library. Keep track of your books, discover new reads, and connect with a community of book lovers.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                className="inline-block rounded-full bg-gradient-to-r from-primary to-purple-600 px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-primary-dark hover:to-purple-700"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#about"
                className="inline-block rounded-full bg-transparent px-8 py-4 text-base font-medium text-white ring-2 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 15], fov: 30 }}
        className="absolute inset-0 z-0"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
        <FloatingShapes />
        <Book />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Hero;
