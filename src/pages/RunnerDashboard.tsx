import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Placeholder for what runner stats might look like
interface RunnerStats {
    joinedEvents: number;
    totalDistance: string; // e.g., "125 km"
    upcomingEventsCount: number;
    achievementsCount: number;
}

const RunnerDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<RunnerStats | null>(null);

    // Simulate data fetching
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

            const sampleStats: RunnerStats = {
                joinedEvents: 5,
                totalDistance: "125 km",
                upcomingEventsCount: 2,
                achievementsCount: 8
            };
            setStats(sampleStats);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Skeleton for Stat Boxes (can be similar to OrganizerDashboard's)
    const StatBoxSkeleton = () => (
        <div className="p-6 bg-gray-200 rounded-xl animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-3"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        </div>
    );
    
    // Skeleton for a content block within a card (e.g., for event lists)
    const ContentBlockSkeleton = () => (
        <div className="py-8 space-y-3 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
    );

    return (
        <div className="max-w-[1200px] mx-auto px-5 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Panel del Corredor</h1>
                <p className="text-gray-600">Visión general de tus carreras y estadísticas.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {loading || !stats ? (
                    <>
                        <StatBoxSkeleton />
                        <StatBoxSkeleton />
                        <StatBoxSkeleton />
                        <StatBoxSkeleton />
                    </>
                ) : (
                    <>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.joinedEvents}</div>
                            <h3 className="font-semibold">Eventos a los que te has unido</h3>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalDistance}</div>
                            <h3 className="font-semibold">Distancia Total</h3>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.upcomingEventsCount}</div>
                            <h3 className="font-semibold">Próximos Eventos</h3>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.achievementsCount}</div>
                            <h3 className="font-semibold">Logros</h3>
                        </div>
                    </>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Próximos Eventos</h2>
                    <Link to="/events" className="text-blue-600 hover:text-blue-700">
                        Encuentra Eventos →
                    </Link>
                </div>
                {loading ? (
                    <ContentBlockSkeleton />
                ) : (
                    <div className="text-center text-gray-600 py-8">
                        No tienes próximos eventos
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Eventos Pasados</h2>
                {loading ? (
                    <ContentBlockSkeleton />
                ) : (
                    <div className="text-center text-gray-600 py-8">
                        No has participado en eventos pasados
                    </div>
                )}
            </div>
        </div>
    );
};

export default RunnerDashboard;