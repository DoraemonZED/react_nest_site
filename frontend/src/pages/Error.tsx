import React from 'react';
import ErrorLayout from '../layouts/ErrorLayout';

const Error = () => {
  return (
    <ErrorLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">很抱歉，页面未找到</p>
      </div>
    </ErrorLayout>
  );
};

export default Error; 