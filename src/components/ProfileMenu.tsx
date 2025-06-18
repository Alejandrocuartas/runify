import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { runnifyTokenName } from '../utils/constants';
import { useGlobalState } from '../context';

const ProfileMenu: React.FC = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const { logged, setLogged } = useGlobalState()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            <div className="flex items-center gap-4">
                {logged && <Link
                    to="/organizer-dashboard"
                    className="text-sm text-gray-600 hover:text-blue-600 hidden md:inline-block"
                >
                    Organizador
                </Link>}
                {logged && <Link
                    to="/runner-dashboard"
                    className="text-sm text-gray-600 hover:text-blue-600 hidden md:inline-block"
                >
                    Runner
                </Link>}

                {logged ? (
                    <div className="relative">
                        <button
                            ref={buttonRef}
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
                                ref={dropdownRef}
                                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-10 max-h-60 overflow-y-auto"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                            >
                                <Link
                                    to="/organizer-dashboard"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Organizador
                                </Link>
                                <Link
                                    to="/runner-dashboard"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Runner
                                </Link>
                                <hr className="my-1" />
                                {/*<Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Mi Perfil
                                </Link>
                                 <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Configuración de cuenta
                                </Link>
                                <hr className="my-1" /> */}
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setLogged(false)
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
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-sm text-gray-600 hover:text-blue-600 hidden md:inline-block"
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