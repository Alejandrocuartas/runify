import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-blue-600 text-white py-20">
                <div className="max-w-[1200px] mx-auto px-5">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Acerca de Nosotros
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl">
            Conectando comunidades a través de eventos significativos.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1200px] mx-auto px-5 py-16">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Mission Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">
              Nuestra Misión
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
              Facilitar la creación y descubrimiento de eventos locales que fortalezcan los lazos comunitarios y fomenten la interacción social.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="text-3xl mb-2">🎯</div>
                                <h3 className="font-semibold mb-2">Visión</h3>
                                <p className="text-sm text-gray-600">Ser la plataforma líder para la conexión comunitaria a través de eventos.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="text-3xl mb-2">💪</div>
                                <h3 className="font-semibold mb-2">Valores</h3>
                                <p className="text-sm text-gray-600">Comunidad, conexión, inclusión y descubrimiento.</p>
                            </div>
                        </div>
                    </div>

                    {/* Community Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">
              Nuestra Comunidad
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
              Creemos en el poder de reunirse. Nuestra plataforma está diseñada para organizadores de eventos y asistentes por igual, proporcionando las herramientas necesarias para crear y encontrar eventos que importan.
                        </p>
                        <div className="bg-gray-50 p-8 rounded-xl mt-8">
                            <h3 className="font-semibold mb-4">Características Clave</h3>
                            <ul className="space-y-4">
                                {[
                                    { key: 'discovery', text: 'Descubrimiento fácil de eventos locales.' },
                                    { key: 'security', text: 'Plataforma segura para la gestión de eventos.' },
                                    { key: 'support', text: 'Soporte dedicado para organizadores.' },
                                    { key: 'connection', text: 'Fomento de conexiones significativas.' },
                                ].map((feature) => (
                                    <li key={feature.key} className="flex items-start">
                                        <span className="text-blue-600 mr-3">✓</span>
                                        <span className="text-gray-600">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold mb-6">
            Únete a Nuestra Comunidad
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            ¿Listo para explorar o crear eventos en tu área? Descubre lo que está sucediendo cerca de ti.
                    </p>
                    <Link
                        to="/events"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <span className="mr-2">Explorar Eventos</span>
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About; 