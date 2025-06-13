import React, { useState, useEffect, FC } from 'react';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import { ResponsiveContainer, ResponsiveGrid } from '../components/Layout';
import CardSkeleton from '../components/CardSkeleton';
import { EventModel, PaginatedResponse, GetRaces } from '../utils/http';
import { useGlobalState } from '../context';

interface Filters {
    type?: string;
    year?: number;
    month?: number;
    city?: string;
    coordinates?: number[];
}

interface EventsProps {
    searchQuery?: string;
}

const Events: FC<EventsProps> = ({ searchQuery = '' }) => {
    const { location, requestLocation } = useGlobalState();
    const [filters, setFilters] = useState<Filters>({});
    const [events, setEvents] = useState<PaginatedResponse<EventModel>>();
    const [loading, setLoading] = useState(true);
    const [locationRequested, setLocationRequested] = useState(false);

    useEffect(() => {
        if (!locationRequested) {
            requestLocation();
            setLocationRequested(true);
        }
    }, [requestLocation, locationRequested]);

    useEffect(() => {
        if (!locationRequested) return;

        const fetchEvents = async () => {
            setLoading(true);

            let coordinates: { latitude: number, longitude: number } | undefined = location?.coordinates;

            if (filters.city && filters.coordinates) {
                coordinates = {
                    latitude: filters.coordinates[1],
                    longitude: filters.coordinates[0]
                };
            }

            try {
                await GetRaces({
                    limit: 50,
                    type: filters.type || '',
                    year: filters.year || undefined,
                    month: filters.month || undefined,
                    latitude: coordinates?.latitude || undefined,
                    longitude: coordinates?.longitude || undefined
                }).then(r => setEvents(r));
            } catch (error) {
                console.error('Error obteniendo eventos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [filters, location?.coordinates, locationRequested]);

    const handleClearFilters = () => {
        setFilters({});
    };

    const handleFilterChange = (filterType: string, value: string, coordinates?: number[]) => {
        if (filterType === 'date') {
            const [year, month] = value.split('-');
            setFilters(prev => ({
                ...prev,
                year: parseInt(year),
                month: parseInt(month)
            }));
        } else if (filterType === 'city') {
            setFilters(prev => ({
                ...prev,
                city: value,
                coordinates: coordinates || []
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [filterType]: value
            }));
        }
    };

    return (
        <ResponsiveContainer>
            <FilterBar
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Eventos de Running</h1>
                <p className="text-base md:text-lg text-gray-600 mb-6">Encuentra las mejores carreras cerca de ti.</p>

                {searchQuery && (
                    <div className="text-gray-600 mb-6 py-2.5 px-3 bg-gray-50 rounded-lg">
                        Mostrando resultados para: &quot;{searchQuery}&quot;
                        ({events?.data?.length} eventos encontrados)
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {[...Array(6)].map((_, index) => <CardSkeleton key={index} />)}
                    </div>
                ) : events?.data && events?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {events?.data?.map(event => (
                            <Card
                                key={event.id}
                                {...event}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-600 bg-gray-50 rounded-lg">
                        <p>No se encontraron eventos que coincidan con tu búsqueda o filtros.</p>
                    </div>
                )}
            </div>
        </ResponsiveContainer>
    );
};

export default Events;