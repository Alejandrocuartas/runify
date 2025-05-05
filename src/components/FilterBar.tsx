import React, { FC } from 'react';

interface FilterBarProps {
    onFilterChange: (filterType: string, value: string) => void;
    onClearFilters: () => void;
}

const FilterBar: FC<FilterBarProps> = ({ onFilterChange, onClearFilters }) => {
    return (
        <div className="bg-gray-50 border-b border-gray-200 py-2 sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center md:flex-row flex-col gap-2">
                <div className="flex gap-3 flex-wrap md:flex-row flex-col w-full">
                    <select
                        onChange={(e) => onFilterChange('type', e.target.value)}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 cursor-pointer transition-all hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 md:w-auto w-full"
                    >
                        <option value="">Tipo de Evento</option>
                        <option value="maratón">Maratón</option>
                        <option value="trail">Trail Run</option>
                    </select>

                    <select
                        onChange={(e) => onFilterChange('distance', e.target.value)}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 cursor-pointer transition-all hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 md:w-auto w-full"
                    >
                        <option value="">Distancia</option>
                        <option value="5km">5K</option>
                        <option value="10km">10K</option>
                        <option value="21km">Media Maratón</option>
                        <option value="42km">Maratón Completa</option>
                    </select>

                    <input
                        type="date"
                        onChange={(e) => onFilterChange('date', e.target.value)}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 cursor-pointer transition-all hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 md:w-[130px] w-full [&::-webkit-calendar-picker-indicator]:scale-75 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                </div>

                <button
                    onClick={onClearFilters}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg bg-transparent text-gray-600 text-sm cursor-pointer transition-all hover:bg-gray-100 hover:text-blue-600 hover:border-blue-600 md:w-auto w-full"
                >
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
};

export default FilterBar;