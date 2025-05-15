import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const MenuIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    );

    const CloseIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-[1200px] mx-auto px-5 py-4 relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Logo />
                        <div className="hidden md:flex items-center gap-6">
                            <Link
                                to="/events"
                                className="text-gray-600 hover:text-blue-600"
                            >
                Eventos
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-600 hover:text-blue-600"
                            >
                Acerca de
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <SearchBar />
                        <ProfileMenu />
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-600 hover:text-blue-600 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-3 border-t border-gray-200 pt-3">
                        <Link
                            to="/events"
                            className="block py-2 px-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Eventos
                        </Link>
                        <Link
                            to="/about"
                            className="block py-2 px-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Acerca de
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;