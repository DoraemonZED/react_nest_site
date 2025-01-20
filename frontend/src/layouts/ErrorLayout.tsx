import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorLayoutProps {
  children: React.ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-screen">
      <div className="w-full bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-default-600 hover:text-default-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回上一页
          </button>
        </div>
      </div>
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
    </div>
  );
};

export default ErrorLayout; 