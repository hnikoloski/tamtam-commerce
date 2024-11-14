"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
      <div className="animate-spin rounded-full border-t-4 border-primary h-44 w-44"></div>
    </div>
  );
};

export default Loader;
