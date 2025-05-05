// Layout.tsx (o LayoutComponents.tsx)
import React, { FC, ReactNode } from 'react';
import Navbar from './Navbar'; // Asegúrate de que la ruta a Navbar sea correcta

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

interface ResponsiveContainerProps {
    children: ReactNode;
    className?: string;
}

export const ResponsiveContainer: FC<ResponsiveContainerProps> = ({ children, className = '' }) => (
    <div className={`responsive-container ${className}`}>
        <div className="w-full max-w-[1280px] mx-auto">
            {children}
        </div>
    </div>
);

interface ResponsiveGridProps {
    children: ReactNode;
    className?: string;
}

export const ResponsiveGrid: FC<ResponsiveGridProps> = ({ children, className = '' }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {children}
    </div>
);

interface ResponsiveCardProps {
    children: ReactNode;
    className?: string;
}

export const ResponsiveCard: FC<ResponsiveCardProps> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow p-4 sm:p-6 ${className}`}>
        {children}
    </div>
);

export default Layout;