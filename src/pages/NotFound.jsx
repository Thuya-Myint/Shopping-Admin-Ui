import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
            <h1 className="text-[8rem] font-bold animate-bounce">404</h1>
            <p className="text-2xl mb-6">Oops! Page Not Found</p>
            <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
            >
                Go Home
            </button>
            <div className="mt-10">
                <svg
                    className="w-40 h-40 animate-spin-slow text-white opacity-30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" />
                </svg>
            </div>
        </div>
    );
};

export default NotFound;