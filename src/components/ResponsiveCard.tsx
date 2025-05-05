// ResponsiveCard.tsx
import React, { FC, ReactNode } from 'react';

interface ResponsiveCardProps {
    children: ReactNode;
}

const ResponsiveCard: FC<ResponsiveCardProps> = ({ children }) => {
    return (
        <div className="tu-clase-tailwind-para-responsive-card"> {/* Reemplaza con tus clases de Tailwind */}
            {children}
        </div>
    );
};

export default ResponsiveCard;