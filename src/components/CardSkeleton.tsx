import React, { FC } from 'react';
import { ResponsiveCard } from './Layout'; // Assuming Layout.tsx is in the same components folder

const CardSkeleton: FC = () => {
    return (
        <ResponsiveCard className="animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
            
            <div className="p-4 space-y-3">
                {/* Title Placeholder */}
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                
                {/* Description Placeholders */}
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>

                {/* Details Placeholders (mimicking date, distance etc.) */}
                <div className="pt-2 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>

                {/* Button Placeholder */}
                <div className="h-5 bg-gray-300 rounded w-1/4 mt-2"></div>
            </div>
        </ResponsiveCard>
    );
};

export default CardSkeleton; 