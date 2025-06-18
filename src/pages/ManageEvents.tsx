import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context';
import TagInput from '../components/TagInput';
import { DeleteEvent, EventModel, GetRaces } from '../utils/http';

const EditEventModal = ({ event, onClose, onSave }: { event: EventModel; onClose: () => void; onSave: (updatedEvent: EventModel) => void }) => {
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState<EventModel>(event);

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
                                        value={eventData.date.split('T')[1]}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Distancias</label>
                                    <TagInput
                                        tags={[]}
                                        onTagsChange={() => { }}
                                        placeholder="Agregar distancia (ej: 5k, 10k, 21k)"
                                        className="w-full"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Precios por Distancia</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4">
                                            <span className="w-24">{eventData.distance}</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={eventData.price.toLocaleString()}
                                                onChange={(e) => handleChange(e)}
                                                name="price"
                                                className="flex-1 p-2 border rounded"
                                                placeholder="Ingrese el precio"
                                                required
                                            />
                                            <span className="text-gray-500">COP</span>
                                        </div>
                                    </div>
                                </div>

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
                                        value={eventData.type}
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
                                    {eventData.type === 'others' && (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="customSubType"
                                                value={eventData.type}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                                placeholder="Especifique el tipo de carrera"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Beneficios</label>
                                    <TagInput
                                        tags={eventData.amenities || []}
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