import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context';
import TagInput from '../components/TagInput';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    startTime: string;
    subType: string;
    customSubType?: string;
    distancePrices: { distance: string; price: number }[];
    maxParticipants: number;
    distanceUnit: string;
    city: string;
    amenities: string[];
    participants: number;
    status: string;
    organizerId: string;
    image?: { fileName: string; contentType: string; s3Key: string; fileUrl: string };
    secondaryImages?: { fileName: string; contentType: string; s3Key: string; fileUrl: string }[];
}

interface Organizer {
    id: string;
    name: string;
    email: string;
}

const EditEventModal = ({ event, onClose, onSave }: { event: Event; onClose: () => void; onSave: (updatedEvent: Event) => void }) => {
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState<Event>(event);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let newValue: unknown = value;
        if (type === "number") {
            newValue = Number(value);
        }
        setEventData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleDistancePriceChange = (distances: string[]) => {
        const currentPrices = eventData.distancePrices;
        const newDistancePrices = distances.map(distance => {
            const existing = currentPrices.find(dp => dp.distance === distance);
            return existing || { distance, price: 0 };
        });
        setEventData(prev => ({
            ...prev,
            distancePrices: newDistancePrices
        }));
    };

    const handlePriceChange = (distance: string, price: string) => {
        const formattedPrice = price.replace(/\D/g, '');
        setEventData(prev => ({
            ...prev,
            distancePrices: prev.distancePrices.map(dp =>
                dp.distance === distance ? { ...dp, price: Number(formattedPrice) } : dp
            )
        }));
    };

    const handleAmenitiesChange = (amenities: string[]) => {
        setEventData(prev => ({
            ...prev,
            amenities: amenities
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Aquí iría la llamada real a la API
            // await api.put(`/events/${event.id}`, eventData);
            onSave(eventData);
            onClose();
        } catch (error) {
            console.error('Error al actualizar evento:', error);
            alert('Error al actualizar el evento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Editar Evento</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Información Básica</h3>

                            <div>
                                <label className="block mb-2">Título</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={eventData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Descripción</label>
                                <textarea
                                    name="description"
                                    value={eventData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Detalles del Evento</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">Fecha</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={eventData.date}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Hora de Inicio</label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={eventData.startTime}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Distancias</label>
                                    <TagInput
                                        tags={eventData.distancePrices.map(dp => dp.distance)}
                                        onTagsChange={handleDistancePriceChange}
                                        placeholder="Agregar distancia (ej: 5k, 10k, 21k)"
                                        className="w-full"
                                    />
                                </div>

                                {eventData.distancePrices.length > 0 && (
                                    <div className="col-span-2">
                                        <label className="block mb-2">Precios por Distancia</label>
                                        <div className="space-y-2">
                                            {eventData.distancePrices.map((dp) => (
                                                <div key={dp.distance} className="flex items-center gap-4">
                                                    <span className="w-24">{dp.distance}</span>
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={dp.price.toLocaleString()}
                                                        onChange={(e) => handlePriceChange(dp.distance, e.target.value)}
                                                        className="flex-1 p-2 border rounded"
                                                        placeholder="Ingrese el precio"
                                                        required
                                                    />
                                                    <span className="text-gray-500">COP</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block mb-2">Unidad de Distancia</label>
                                    <select
                                        name="distanceUnit"
                                        value={eventData.distanceUnit}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">Seleccionar Unidad</option>
                                        <option value="kilometers">Kilómetros</option>
                                        <option value="miles">Millas</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2">Tipo</label>
                                    <select
                                        name="subType"
                                        value={eventData.subType}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">Seleccionar Tipo</option>
                                        <option value="Short distance race">Carrera de corta distancia</option>
                                        <option value="Medium distance race">Carrera de media distancia</option>
                                        <option value="Long distance race">Carrera de larga distancia</option>
                                        <option value="Trail race">Carrera de trail</option>
                                        <option value="Tematic or recreational race">Carrera tematica o recreativa</option>
                                        <option value="Asphalt race">Carrera en Asfalto</option>
                                        <option value="Charity race or race with a cause">Carrera Benefica o con Causa</option>
                                        <option value="Obstacle race">Carrera de Obstaculos</option>
                                        <option value="Individual race">Carrera individual</option>
                                        <option value="Team race">Carrera en Equpos</option>
                                        <option value="Race with a theme">Carrera con tema</option>
                                        <option value="others">Otros</option>
                                    </select>
                                    {eventData.subType === 'others' && (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="customSubType"
                                                value={eventData.customSubType}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                                placeholder="Especifique el tipo de carrera"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2">Máximo de Participantes</label>
                                    <input
                                        type="number"
                                        name="maxParticipants"
                                        value={eventData.maxParticipants}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Beneficios</label>
                                    <TagInput
                                        tags={eventData.amenities}
                                        onTagsChange={handleAmenitiesChange}
                                        placeholder="Agregar beneficio (ej: Medalla, Hidratación, Camiseta)"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ManageEvents = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentOrganizer, setCurrentOrganizer] = useState<Organizer | null>(null);
    const navigate = useNavigate();
    const { token, logged } = useGlobalState();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!logged || !token) {
                    navigate('/login');
                    return;
                }

                // Simulamos obtener los datos del organizador
                const organizerData: Organizer = {
                    id: 'org_123',
                    name: 'Organizador Ejemplo',
                    email: 'organizador@ejemplo.com'
                };
                setCurrentOrganizer(organizerData);

                // Ahora podemos cargar los eventos específicos del organizador
                await fetchEvents(organizerData.id);
            } catch (error) {
                console.error('Error de autenticación:', error);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate, logged, token]);

    const fetchEvents = async (organizerId: string) => {
        setLoading(true);
        try {
            // Aquí iría la llamada real a la API
            // Por ejemplo: const response = await api.get(`/events?organizerId=${organizerId}`);

            // Simulamos la respuesta de la API
            await new Promise(resolve => setTimeout(resolve, 1000));

            const sampleEvents: Event[] = [
                {
                    id: 1,
                    title: "Maratón de la Ciudad 2024",
                    description: "Carrera urbana por las principales calles de la ciudad",
                    date: "2024-03-15",
                    startTime: "07:00",
                    subType: "Long distance race",
                    distancePrices: [
                        { distance: "21k", price: 50000 },
                        { distance: "42k", price: 75000 }
                    ],
                    maxParticipants: 1000,
                    distanceUnit: "kilometers",
                    city: "Bogotá",
                    amenities: ["Medalla", "Hidratación", "Camiseta"],
                    participants: 85,
                    status: "active",
                    organizerId: organizerId
                },
                {
                    id: 2,
                    title: "Carrera Nocturna Trail",
                    description: "Carrera nocturna por senderos naturales",
                    date: "2024-04-05",
                    startTime: "20:00",
                    subType: "Trail race",
                    distancePrices: [
                        { distance: "10k", price: 35000 },
                        { distance: "15k", price: 45000 }
                    ],
                    maxParticipants: 500,
                    distanceUnit: "kilometers",
                    city: "Medellín",
                    amenities: ["Medalla", "Hidratación", "Frontal"],
                    participants: 45,
                    status: "active",
                    organizerId: organizerId
                },
                {
                    id: 3,
                    title: "Desafío Carrera en la Playa",
                    description: "Carrera recreativa en la playa",
                    date: "2024-05-20",
                    startTime: "08:00",
                    subType: "Tematic or recreational race",
                    distancePrices: [
                        { distance: "5k", price: 25000 },
                        { distance: "10k", price: 35000 }
                    ],
                    maxParticipants: 300,
                    distanceUnit: "kilometers",
                    city: "Cartagena",
                    amenities: ["Medalla", "Hidratación", "Tostada"],
                    participants: 26,
                    status: "upcoming",
                    organizerId: organizerId
                }
            ];
            setEvents(sampleEvents);
        } catch (error) {
            console.error('Error al cargar eventos:', error);
            // Aquí podríamos mostrar un mensaje de error al usuario
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event: Event) => {
        if (event.organizerId !== currentOrganizer?.id) {
            alert('No tienes permiso para editar este evento');
            return;
        }
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const handleSaveEvent = (updatedEvent: Event) => {
        setEvents(events.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ));
        setIsEditModalOpen(false);
        setSelectedEvent(null);
    };

    const handleDelete = async (eventId: number) => {
        // Verificamos que el evento pertenezca al organizador actual
        const eventToDelete = events.find(event => event.id === eventId);
        if (eventToDelete?.organizerId !== currentOrganizer?.id) {
            alert('No tienes permiso para eliminar este evento');
            return;
        }

        if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            try {
                // Aquí iría la llamada real a la API para eliminar el evento
                // await api.delete(`/events/${eventId}`);

                setEvents(events.filter(event => event.id !== eventId));
            } catch (error) {
                console.error('Error al eliminar evento:', error);
                alert('Error al eliminar el evento');
            }
        }
    };

    const handleStatusChange = async (eventId: number, newStatus: string) => {
        // Verificamos que el evento pertenezca al organizador actual
        const eventToUpdate = events.find(event => event.id === eventId);
        if (eventToUpdate?.organizerId !== currentOrganizer?.id) {
            alert('No tienes permiso para modificar este evento');
            return;
        }

        try {
            // Aquí iría la llamada real a la API para actualizar el estado
            // await api.patch(`/events/${eventId}`, { status: newStatus });

            setEvents(events.map(event =>
                event.id === eventId ? { ...event, status: newStatus } : event
            ));
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            alert('Error al actualizar el estado del evento');
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
                                    <th className="text-left py-3 px-4">Estado</th>
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
                                            {event.participants}
                                        </td>
                                        <td className="py-4 px-4">
                                            <select
                                                value={event.status}
                                                onChange={(e) => handleStatusChange(event.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm ${event.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}
                                            >
                                                <option value="active">Activo</option>
                                                <option value="upcoming">Próximo</option>
                                                <option value="completed">Completado</option>
                                                <option value="cancelled">Cancelado</option>
                                            </select>
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
                                                    onClick={() => handleDelete(event.id)}
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

            {isEditModalOpen && selectedEvent && (
                <EditEventModal
                    event={selectedEvent}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedEvent(null);
                    }}
                    onSave={handleSaveEvent}
                />
            )}
        </div>
    );
};

export default ManageEvents; 