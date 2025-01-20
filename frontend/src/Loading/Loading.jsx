import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900 border-solid mb-6"></div>
        <h1 className="text-2xl font-semibold text-gray-950">Loading, please wait...</h1>
      </div>
    </div>
  );
}

export default Loading;
