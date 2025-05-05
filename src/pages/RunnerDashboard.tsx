import React from 'react';
import { Link } from 'react-router-dom';


const RunnerDashboard = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-5 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Panel del Corredor</h1>
                <p className="text-gray-600">Visión general de tus carreras y estadísticas.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
                <div className="p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                    <h3 className="font-semibold">Eventos a los que te has unido</h3>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">0 km</div>
                    <h3 className="font-semibold">Distancia Total</h3>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                    <h3 className="font-semibold">Próximos Eventos</h3>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                    <h3 className="font-semibold">Logros</h3>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Próximos Eventos</h2>
                    <Link to="/events" className="text-blue-600 hover:text-blue-700">
                        Encuentra Eventos →
                    </Link>
                </div>
                <div className="text-center text-gray-600 py-8">
                    No tienes próximos eventos
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Eventos Pasados</h2>
                <div className="text-center text-gray-600 py-8">
                    No has participado en eventos pasados
                </div>
            </div>
        </div>
    );
};

export default RunnerDashboard;