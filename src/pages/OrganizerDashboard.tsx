import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


interface Stats {
    activeEvents: number;
    totalParticipants: number;
    upcomingEvents: number;
    pastEvents: number;
}

interface Event {
    id: number;
    title: string;
    date: string;
    participants: number;
    status: string;
}

const OrganizerDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentEvents, setRecentEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));

            const sampleStats: Stats = {
                activeEvents: 3,
                totalParticipants: 156,
                upcomingEvents: 2,
                pastEvents: 1
            };
            setStats(sampleStats);

            const sampleRecentEvents: Event[] = [
                {
                    id: 1,
                    title: "Maratón de la Ciudad 2024",
                    date: "2024-03-15",
                    participants: 85,
                    status: "active"
                },
                {
                    id: 2,
                    title: "Carrera Nocturna Trail",
                    date: "2024-04-05",
                    participants: 45,
                    status: "active"
                },
                {
                    id: 3,
                    title: "Desafío Carrera en la Playa",
                    date: "2024-05-20",
                    participants: 26,
                    status: "upcoming"
                }
            ];
            setRecentEvents(sampleRecentEvents);
            setLoading(false);
        };
        fetchData();
    }, []);

    const ActionLinkSkeleton = () => (
        <div className="p-6 bg-gray-200 rounded-xl animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
    );

    const StatBoxSkeleton = () => (
        <div className="p-4 bg-gray-200 rounded-lg animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
    );

    const RecentEventItemSkeleton = () => (
        <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 animate-pulse">
            <div className="w-full sm:w-3/4">
                <div className="h-5 bg-gray-300 rounded w-3/5 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/5"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded-full w-20 mt-2 sm:mt-0"></div>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto px-5 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Panel del Organizador</h1>
                <p className="text-gray-600">Visión general de tus eventos y estadísticas.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {loading ? (
                    <>
                        <ActionLinkSkeleton />
                        <ActionLinkSkeleton />
                        <ActionLinkSkeleton />
                    </>
                ) : (
                    <>
                        <Link
                            to="/add-race"
                            className="p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            <h3 className="font-semibold mb-2">Crear Evento</h3>
                            <p className="text-sm opacity-90">Añade un nuevo evento al calendario.</p>
                        </Link>
                        <Link
                            to="/manage-events"
                            className="p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <h3 className="font-semibold mb-2">Gestionar Eventos</h3>
                            <p className="text-sm text-gray-600">
                                Administra y actualiza tus eventos existentes.
                            </p>
                        </Link>
                        <Link
                            to="/event-statistics"
                            className="p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <h3 className="font-semibold mb-2">Ver Estadísticas</h3>
                            <p className="text-sm text-gray-600">
                                Analiza el rendimiento de tus eventos.
                            </p>
                        </Link>
                    </>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Resumen de Eventos</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {loading || !stats ? (
                        <>
                            <StatBoxSkeleton />
                            <StatBoxSkeleton />
                            <StatBoxSkeleton />
                            <StatBoxSkeleton />
                        </>
                    ) : (
                        <>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{stats.activeEvents}</div>
                                <div className="text-sm text-gray-600">Eventos Activos</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{stats.totalParticipants}</div>
                                <div className="text-sm text-gray-600">Participantes Totales</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{stats.upcomingEvents}</div>
                                <div className="text-sm text-gray-600">Próximos Eventos</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{stats.pastEvents}</div>
                                <div className="text-sm text-gray-600">Eventos Pasados</div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Eventos Recientes</h2>
                <div className="divide-y">
                    {loading ? (
                        <>
                            <RecentEventItemSkeleton />
                            <RecentEventItemSkeleton />
                            <RecentEventItemSkeleton />
                        </>
                    ) : recentEvents.length > 0 ? (
                        recentEvents.map(event => (
                            <div key={event.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <h3 className="font-medium mb-1">{event.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(event.date).toLocaleDateString()} · {event.participants} participantes
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm ${event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {event.status === 'active' ? 'Activo' : 'Próximo'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No hay eventos recientes para mostrar.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;