import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const mobileInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/events?search=${encodeURIComponent(query.trim())}`);
            setIsMobileSearchOpen(false); // Close mobile search after submitting
        }
    };

    useEffect(() => {
        if (isMobileSearchOpen && mobileInputRef.current) {
            mobileInputRef.current.focus();
        }
    }, [isMobileSearchOpen]);

    const SearchIconSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );

    const CloseIconSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <>
            {/* Desktop Search Form */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar eventos..."
                    className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    aria-label="Buscar"
                >
                    <SearchIconSvg />
                </button>
            </form>

            {/* Mobile Search: Toggle Button */}
            <div className="md:hidden">
                {!isMobileSearchOpen && (
                    <button
                        onClick={() => setIsMobileSearchOpen(true)}
                        className="p-2 text-gray-600 hover:text-blue-600"
                        aria-label="Abrir búsqueda"
                    >
                        <SearchIconSvg />
                    </button>
                )}
            </div>

            {/* Mobile Search: Expanded View (Overlay) */}
            {isMobileSearchOpen && (
                <div className="md:hidden absolute top-0 left-0 right-0 z-20 bg-white h-full flex items-center px-2 shadow">
                    <form onSubmit={handleSearch} className="relative flex items-center w-full h-full">
                        <input
                            ref={mobileInputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar eventos..."
                            className="w-full h-full px-3 py-2 pr-20 rounded-lg border-0 focus:outline-none focus:ring-0" // Simplified border/focus for overlay
                        />
                        {/* Submit search button */}
                        <button
                            type="submit"
                            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 p-1"
                            aria-label="Buscar"
                        >
                            <SearchIconSvg />
                        </button>
                        {/* Close mobile search button */}
                        <button
                            type="button"
                            onClick={() => {
                                setIsMobileSearchOpen(false);
                                setQuery(''); 
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 p-1"
                            aria-label="Cerrar búsqueda"
                        >
                            <CloseIconSvg />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default SearchBar; 