import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { runnifyTokenName } from '../utils/constants';

const ProfileMenu: React.FC = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = localStorage.getItem(runnifyTokenName) !==null;

    return (
        <div className="relative">
            <div className="flex items-center gap-4">
                <Link
                    to="/organizer-dashboard"
                    className="text-sm text-gray-600 hover:text-blue-600"
                >
          Organizador
                </Link>
                <Link
                    to="/runner-dashboard"
                    className="text-sm text-gray-600 hover:text-blue-600"
                >
          Runner
                </Link>

                {isLoggedIn ? (
                    <>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                        >
                            <img
                                src="https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png"
                                alt={'Perfil de usuario'}
                                className="w-8 h-8 rounded-full" 
                            />
                        </button>

                        {isOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                            >
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {'Mi Perfil'}
                                </Link>
                                <Link
                                    to="/my-events"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {'Mis Eventos'}
                                </Link>
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {'Configuraciones'}
                                </Link>
                                <hr className="my-1" />
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        localStorage.removeItem(runnifyTokenName)
                                        navigate("/")
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                  Cerrar sesión
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-sm text-gray-600 hover:text-blue-600"
                        >
              Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700"
                        >
              Registrarse
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileMenu; 