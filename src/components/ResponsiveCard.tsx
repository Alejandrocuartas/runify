// ResponsiveCard.tsx
import React, { FC, ReactNode } from 'react';

interface ResponsiveCardProps {
    children: ReactNode;
    className?: string;
}

const ResponsiveCard: FC<ResponsiveCardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export default ResponsiveCard;