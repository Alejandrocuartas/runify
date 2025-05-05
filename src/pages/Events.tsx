import React, { useState, useEffect, FC } from 'react';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import { ResponsiveContainer, ResponsiveGrid } from '../components/Layout';

interface Event {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    distance: string;
    location: string;
    price: number;
    rating: string;
    type: string;
}

interface Filters {
    type?: string;
    distance?: string;
    date?: string;
}

interface EventsProps {
    searchQuery?: string;
}

const Events: FC <EventsProps> = ({ searchQuery = '' }) => {
    const [filters, setFilters] = useState<Filters>({});
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();

                const transformedEvents = data.slice(0, 8).map(post => ({
                    id: post.id,
                    title: post.title,
                    description: post.body,
                    imageUrl: `https://picsum.photos/800/800?random=${post.id}`,
                    date: "15 de Marzo, 2024",
                    distance: "42km",
                    location: getRandomLocation(),
                    price: getRandomPrice(),
                    rating: getRandomRating(),
                    type: getRandomType()
                }));

                setEvents(transformedEvents);
                setLoading(false);
            } catch (error) {
                console.error('Error obteniendo eventos:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const getRandomLocation = (): string => {
        const locations = [
            "Parque Central, Nueva York",
            "Golden Gate Park, SF",
            "Hyde Park, Londres",
            "Stanley Park, Vancouver",
            "Centennial Park, Sydney"
        ];
        return locations[Math.floor(Math.random() * locations.length)];
    };

    const getRandomPrice = (): number => {
        const prices = [29.99, 49.99, 79.99, 99.99, 149.99];
        return prices[Math.floor(Math.random() * prices.length)];
    };

    const getRandomRating = (): string => {
        return (4 + Math.random()).toFixed(2);
    };

    const getRandomType = (): string => {
        const types = ["maratón", "media maratón", "10k", "5k", "trail"];
        return types[Math.floor(Math.random() * types.length)];
    };

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleClearFilters = () => {
        setFilters({});
    };

    const filteredEvents = events.filter(event => {
        const matchesQuery = !searchQuery || event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !filters.type || event.type === filters.type;
        const matchesDistance = !filters.distance || event.distance === filters.distance;
        const matchesDate = !filters.date || event.date === filters.date;

        return matchesQuery && matchesType && matchesDistance && matchesDate;
    });

    if (loading) {
        return <div className="text-center py-10">Cargando eventos...</div>;
    }

    return (
        <ResponsiveContainer>
            <FilterBar
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            <div className="section">
                <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-2">Eventos de Running</h1>
                <p className="text-lg text-gray-600 mb-4">Encuentra las mejores carreras cerca de ti.
                </p>

                {searchQuery && (
                    <div className="text-gray-600 mb-6 py-2.5 px-3 bg-gray-50 rounded-lg">
                        Mostrando resultados para: &quot;{searchQuery}&quot;
                        ({filteredEvents.length} eventos encontrados)
                    </div>
                )}

                {filteredEvents.length > 0 ? (
                    <ResponsiveGrid>
                        {filteredEvents.map(event => (
                            <Card
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                description={event.description}
                                imageUrl={event.imageUrl}
                                date={event.date}
                                distance={event.distance}
                                location={event.location}
                                price={String(event.price)}
                            />
                        ))}
                    </ResponsiveGrid>
                ) : (
                    <div className="text-center py-10 text-gray-600 bg-gray-50 rounded-lg">
                        <p>No se encontraron eventos que coincidan con tu búsqueda.</p>
                    </div>
                )}
            </div>
        </ResponsiveContainer>
    );
};

export default Events;