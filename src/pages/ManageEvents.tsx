import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context';
import { DeleteEvent, EventModel, GetRaces } from '../utils/http';
import EditEventModal from '../components/EditEventModal';


const ManageEvents = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<EventModel[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate();
    const { token, logged, user } = useGlobalState();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!logged || !token) {
                    navigate('/login');
                    return;
                }

                if (user) {
                    await fetchEvents(user.id);
                }
            } catch (error) {
                console.error('Error de autenticación:', error);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate, logged, token, user]);

    const fetchEvents = async (organizerId: number) => {
        setLoading(true);
        try {

            GetRaces({
                user: organizerId,
                limit: 1000,
            }).then(res => {
                setEvents(res.data);
            }).catch(err => {
                console.error('Error al cargar eventos:', err);
            });

        } catch (error) {
            console.error('Error al cargar eventos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event: EventModel) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const handleSaveEvent = (updatedEvent: EventModel) => {
        setEvents(events.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ));
        setIsEditModalOpen(false);
        setSelectedEvent(null);
    };

    const handleDelete = async (eventId: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            try {
                await DeleteEvent(eventId, token as string);
                setEvents(events.filter(event => event.id !== eventId));
            } catch (error) {
                console.error('Error al eliminar evento:', error);
                alert('Error al eliminar el evento');
            }
        }
    };

    const EventTableSkeleton = () => (
        <div className="animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="py-4 border-b">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto px-5 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Gestionar Eventos</h1>
                <p className="text-gray-600">Administra y actualiza tus eventos existentes.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Lista de Eventos</h2>
                    <Link
                        to="/add-race"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Nuevo Evento
                    </Link>
                </div>

                {loading ? (
                    <EventTableSkeleton />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">Evento</th>
                                    <th className="text-left py-3 px-4">Fecha</th>
                                    <th className="text-left py-3 px-4">Participantes</th>
                                    <th className="text-left py-3 px-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.id} className="border-b">
                                        <td className="py-4 px-4">
                                            <div className="font-medium">{event.title}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            {new Date(event.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            {event.participants || 0}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id as number)}
                                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {
                isEditModalOpen && selectedEvent && (
                    <EditEventModal
                        event={selectedEvent}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedEvent(null);
                        }}
                        onSave={handleSaveEvent}
                    />
                )
            }
        </div >
    );
};

export default ManageEvents; 