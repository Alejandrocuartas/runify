import React, { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResponsiveContainer } from '../components/Layout'; // Assuming Layout.tsx is in src/components

// Placeholder for what event data might look like (similar to what's in Card.tsx or Events.tsx)
interface EventDetails {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string; // Could be more structured, e.g., Date object or specific string format
    startTime?: string;
    location?: string;
    distance?: string;
    price?: string | number;
    amenities?: string[];
    organizer?: string;
    // Add other fields as necessary
}

const EventDetailPage: FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) return;

        // Simulate fetching event data
        const fetchEventDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // In a real app, you would fetch this from your API:
                // const response = await fetch(`/api/events/${eventId}`);
                // if (!response.ok) throw new Error('Evento no encontrado');
                // const data = await response.json();
                // setEvent(data);

                // Simulated data for now:
                console.log(`Fetching details for event: ${eventId}`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

                const mockEvent: EventDetails = {
                    id: eventId,
                    title: `Detalles del Evento ${eventId}`,
                    description: `Esta es una descripción detallada para el evento ${eventId}. Cubre todos los aspectos importantes y anima a la gente a participar. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                    imageUrl: `https://picsum.photos/seed/${eventId}/1200/400`,
                    date: "25 de Diciembre, 2024",
                    startTime: "09:00 AM",
                    location: "Parque Metropolitano, Ciudad Ejemplo",
                    distance: "10km",
                    price: "Gratis",
                    amenities: ["Estaciones de hidratación", "Servicio médico", "Guardarropa", "Medalla de finalista"],
                    organizer: "Grandes Eventos S.A."
                };
                setEvent(mockEvent);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ocurrió un error al cargar el evento.');
                console.error("Error fetching event details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) {
        return (
            <ResponsiveContainer>
                <div className="text-center py-20">Cargando detalles del evento...</div>
            </ResponsiveContainer>
        );
    }

    if (error) {
        return (
            <ResponsiveContainer>
                <div className="text-center py-20 text-red-600">Error: {error}</div>
            </ResponsiveContainer>
        );
    }

    if (!event) {
        return (
            <ResponsiveContainer>
                <div className="text-center py-20">Evento no encontrado.</div>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer className="py-8 md:py-12">
            {/* Hero Image */}
            <div className="mb-8 md:mb-12">
                <img 
                    src={event.imageUrl} 
                    alt={`Imagen de ${event.title}`}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                />
            </div>

            {/* Main Content Area - Using a grid for potential sidebar later */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{event.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
                        <p><span role="img" aria-label="Fecha">📅</span> {event.date} {event.startTime && `- ${event.startTime}`}</p>
                        {event.location && <p><span role="img" aria-label="Ubicación">📍</span> {event.location}</p>}
                        {event.distance && <p><span role="img" aria-label="Distancia">🏃</span> {event.distance}</p>}
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Descripción del Evento</h2>
                        <p>{event.description}</p>
                    </div>

                    {event.amenities && event.amenities.length > 0 && (
                        <div className="pt-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Servicios Incluidos</h2>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {event.amenities.map((amenity, index) => (
                                    <li key={index}>{amenity}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column (Sidebar - e.g., for Price, Register Button, Map) */}
                <aside className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Rápida</h2>
                        <div className="space-y-3">
                            {event.price && (
                                <p className="text-lg">
                                    <span className="font-medium text-gray-700">Precio: </span> 
                                    <span className="text-blue-600 font-semibold">{typeof event.price === 'number' ? `$${event.price.toLocaleString('es-CO')}` : event.price}</span>
                                </p>
                            )}
                            {/* Could add organizer, max participants etc. here */}
                            {event.organizer && (
                                <p className="text-sm">
                                    <span className="font-medium text-gray-700">Organizador: </span> 
                                    {event.organizer}
                                </p>
                            )}
                            <Link
                                to={`/events/${event.id}/register`}
                                className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
                            >
                                Inscribirme Ahora
                            </Link>
                        </div>
                    </div>
                    
                    {/* Placeholder for a map */}
                    {event.location && (
                        <div className="bg-gray-50 p-6 rounded-xl shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Ubicación</h2>
                            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                                Placeholder del Mapa para: {event.location}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </ResponsiveContainer>
    );
};

export default EventDetailPage; 