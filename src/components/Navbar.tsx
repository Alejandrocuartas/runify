import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';

const Navbar = () => {

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-[1200px] mx-auto px-5 py-4">
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;