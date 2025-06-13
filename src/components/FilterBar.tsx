import React, { FC, useState } from 'react';
import { Location } from '../utils/types';
import { SearchLocationsSmart } from '../utils/http';
import { useGlobalState } from '../context';

interface FilterBarProps {
    onFilterChange: (filterType: string, value: string, coordinates?: number[]) => void;
    onClearFilters: () => void;
}

const FilterBar: FC<FilterBarProps> = ({ onFilterChange, onClearFilters }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [cities, setCities] = useState<Location[]>([]);
    const { token } = useGlobalState();

    const handleSelectCity = (city: Location) => {
        onFilterChange('city', city.name, city.coordinates);
        setShowDropdown(false);
        setCities([]);
    };

    const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (token && value.length > 0) {
            SearchLocationsSmart(value, token)
                .then(setCities)
                .catch(error => {
                    console.error("Error al buscar ciudades:", error);
                });
        } else {
            setCities([]);
        }
        setShowDropdown(true);
    };

    return (
        <div className="bg-gray-50 border-b border-gray-200 py-2 sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center md:flex-row flex-col gap-2">
                <div className="flex gap-3 flex-wrap md:flex-row flex-col w-full">
                    <select
                        onChange={(e) => onFilterChange('type', e.target.value)}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 cursor-pointer transition-all hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 md:w-auto w-full"
                    >
                        <option value="">Seleccionar Tipo</option>
                        <option value="short_distance_race">Carrera de corta distancia</option>
                        <option value="medium_distance_race">Carrera de media distancia</option>
                        <option value="long_distance_race">Carrera de larga distancia</option>
                        <option value="trail_race">Carrera de trail</option>
                        <option value="tematic_or_recreational_race">Carrera tematica o recreativa</option>
                        <option value="asphalt_race">Carrera en Asfalto</option>
                        <option value="charity_race_or_race_with_a_cause">Carrera Benefica o con Causa</option>
                        <option value="obstacle_race">Carrera de Obstaculos</option>
                        <option value="individual_race">Carrera individual</option>
                        <option value="team_race">Carrera en Equpos</option>
                        <option value="race_with_a_theme">Carrera con tema</option>
                        <option value="other">Otro</option>
                    </select>

                    {/* <select
                        onChange={(e) => onFilterChange('distance', e.target.value)}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 cursor-pointer transition-all hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 md:w-auto w-full"
                    >
                        <option value="">Distancia</option>
                        <option value="5km">5K</option>
                        <option value="10km">10K</option>
                        <option value="21km">Media Maratón</option>
                        <option value="42km">Maratón Completa</option>
                    </select> */}

                    <input
                        type="month"
                        onChange={(e) => onFilterChange('date', e.target.value)}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 cursor-pointer transition-all hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 md:w-[130px] w-full [&::-webkit-calendar-picker-indicator]:scale-75 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />

                    {/* Contenedor relativo para el input y el dropdown */}
                    <div className="relative md:w-[130px] w-full">
                        <input
                            type="text"
                            name="city"
                            onChange={handleChangeLocation}
                            onFocus={() => setShowDropdown(true)}
                            className="px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 cursor-pointer transition-all hover:border-blue-600 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 w-full"
                            placeholder="Buscar ciudad..."
                            required
                        />
                        {showDropdown && cities.length > 0 && (
                            <ul className="absolute left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                {cities.map((city) => (
                                    <li
                                        key={city.name}
                                        onClick={() => handleSelectCity(city)}
                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-gray-800"
                                    >
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
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