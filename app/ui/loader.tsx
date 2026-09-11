import React from 'react';
export default function Loader({ size = 'md', color = 'primary' }) {
    const sizeClasses = {
        sm: 'w-5 h-5 border-2',
        md: 'w-8 h-8 border-4',
        lg: 'w-12 h-12 border-4',
    };

    const colorClasses = {
        primary: 'border-blue-500 text-blue-500',
        secondary: 'border-gray-500 text-gray-500',
        success: 'border-green-500 text-green-500',
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`
          ${sizeClasses[size] || sizeClasses.md}
          ${colorClasses[color] || colorClasses.primary}
          border-solid
          rounded-full
          animate-spin
          border-t-transparent
        `}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}