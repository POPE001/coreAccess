import React from 'react';

const ComingSoon: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-lg w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        COMING SOON
                    </h2>
                <p className="text-gray-700 text-lg sm:text-xl md:text-2xl">
                    This page is under development and will be available soon.
                </p>
            </div>
        </div>
    );
};

export default ComingSoon;
