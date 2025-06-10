import React, { useState, useEffect } from 'react';

interface EventStats {
    id: number;
    title: string;
    totalRegistrations: number;
    totalRevenue: number;
    registrationsByDistance: {
        distance: string;
        count: number;
        revenue: number;
    }[];
    registrationsByStatus: {
        status: string;
        count: number;
    }[];
    registrationsByDate: {
        date: string;
        count: number;
    }[];
    paymentStatus: {
        paid: number;
        pending: number;
        cancelled: number;
    };
}

const EventStatistics = () => {
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [events, setEvents] = useState<{ id: number; title: string }[]>([]);
    const [stats, setStats] = useState<EventStats | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Simulación de datos - Aquí iría la llamada real a la API
                await new Promise(resolve => setTimeout(resolve, 1000));

                const sampleEvents = [
                    { id: 1, title: "Maratón de la Ciudad 2024" },
                    { id: 2, title: "Carrera Nocturna Trail" },
                    { id: 3, title: "Desafío Carrera en la Playa" }
                ];
                setEvents(sampleEvents);

                if (selectedEvent) {
                    const sampleStats: EventStats = {
                        id: selectedEvent,
                        title: sampleEvents.find(e => e.id === selectedEvent)?.title || "",
                        totalRegistrations: 156,
                        totalRevenue: 7800000,
                        registrationsByDistance: [
                            { distance: "5k", count: 45, revenue: 1125000 },
                            { distance: "10k", count: 78, revenue: 2730000 },
                            { distance: "21k", count: 33, revenue: 2475000 }
                        ],
                        registrationsByStatus: [
                            { status: "Confirmado", count: 142 },
                            { status: "Pendiente", count: 14 }
                        ],
                        registrationsByDate: [
                            { date: "2024-01-01", count: 25 },
                            { date: "2024-01-02", count: 18 },
                            { date: "2024-01-03", count: 32 }
                        ],
                        paymentStatus: {
                            paid: 142,
                            pending: 14,
                            cancelled: 0
                        }
                    };
                    setStats(sampleStats);
                }
            } catch (error) {
                console.error('Error al cargar estadísticas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedEvent]);

    const StatBox = ({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) => (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">{title}</div>
            <div className="text-2xl font-bold text-blue-600">{value}</div>
            {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
        </div>
    );

    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto px-5 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Estadísticas de Eventos</h1>
                <p className="text-gray-600">Analiza el rendimiento y la participación en tus eventos.</p>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Evento
                </label>
                <select
                    value={selectedEvent || ''}
                    onChange={(e) => setSelectedEvent(Number(e.target.value))}
                    className="w-full md:w-64 p-2 border rounded-lg"
                >
                    <option value="">Seleccionar un evento</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>
                            {event.title}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <LoadingSkeleton />
            ) : stats ? (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatBox
                            title="Total de Inscritos"
                            value={stats.totalRegistrations}
                            subtitle="Participantes registrados"
                        />
                        <StatBox
                            title="Ingresos Totales"
                            value={`$${stats.totalRevenue.toLocaleString()}`}
                            subtitle="Ingresos generados"
                        />
                        <StatBox
                            title="Tasa de Pago"
                            value={`${Math.round((stats.paymentStatus.paid / stats.totalRegistrations) * 100)}%`}
                            subtitle="Inscripciones pagadas"
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Inscripciones por Distancia</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {stats.registrationsByDistance.map((item) => (
                                <div key={item.distance} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Distancia {item.distance}</div>
                                    <div className="text-xl font-bold text-blue-600">{item.count} inscritos</div>
                                    <div className="text-sm text-gray-500">
                                        ${item.revenue.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Estado de Pagos</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pagados</span>
                                    <span className="font-semibold text-green-600">{stats.paymentStatus.paid}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pendientes</span>
                                    <span className="font-semibold text-yellow-600">{stats.paymentStatus.pending}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Cancelados</span>
                                    <span className="font-semibold text-red-600">{stats.paymentStatus.cancelled}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Estado de Inscripciones</h2>
                            <div className="space-y-4">
                                {stats.registrationsByStatus.map((item) => (
                                    <div key={item.status} className="flex justify-between items-center">
                                        <span className="text-gray-600">{item.status}</span>
                                        <span className="font-semibold text-blue-600">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Inscripciones por Fecha</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.registrationsByDate.map((item) => (
                                <div key={item.date} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">
                                        {new Date(item.date).toLocaleDateString()}
                                    </div>
                                    <div className="text-xl font-bold text-blue-600">{item.count}</div>
                                    <div className="text-sm text-gray-500">inscripciones</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500 py-8">
                    Selecciona un evento para ver sus estadísticas
                </div>
            )}
        </div>
    );
};

export default EventStatistics; 