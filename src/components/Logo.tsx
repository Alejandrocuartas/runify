import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
            <span className="text-xl font-bold">Runify</span>
        </Link>
    );
}

export default Logo;
