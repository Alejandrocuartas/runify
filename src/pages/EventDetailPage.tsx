import React, { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResponsiveContainer } from '../components/Layout'; // Assuming Layout.tsx is in src/components
import { EventModel, GetRaces } from '../utils/http';
import { distanceUnitsSymbols, eventTypes } from '../utils/constants';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const EventDetailPage: FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<EventModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) return;

        const fetchEventDetails = async () => {
            setLoading(true);
            try {
                await GetRaces({
                    limit: 1,
                    id: parseInt(eventId)
                }).then(r => setEvent(r.data[0]));
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Ocurrió un error al cargar el evento.');
                console.error('Error obteniendo evento:', error);
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
                        <p><span role="img" aria-label="Fecha">📅</span> {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(event.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                        {event.location && <p><span role="img" aria-label="Ubicación">📍</span> {event.city}</p>}
                        {event.distance && <p><span role="img" aria-label="Distancia">🏃</span> {event.distance}{distanceUnitsSymbols[event.distanceUnit]}</p>}
                        {event.type && <p><span role="img" aria-label="Tipo">🏃</span> {eventTypes[event.type]}</p>}
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
                                    <span className="text-blue-600 font-semibold">{event.priceUnit} ${event.price.toLocaleString('es-CO')}</span>
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

                    {/* Mapa de ubicación */}
                    {event.location && (
                        <div className="bg-gray-50 p-6 rounded-xl shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Ubicación</h2>
                            <div className="w-full h-64 rounded-lg overflow-hidden">
                                <MapContainer
                                    center={[event.location.coordinates[1], event.location.coordinates[0]]}
                                    zoom={15}
                                    scrollWheelZoom={false}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[event.location.coordinates[1], event.location.coordinates[0]]}>
                                        <Popup>
                                            {event.city}<br />{event.title}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </ResponsiveContainer>
    );
};

export default EventDetailPage; 