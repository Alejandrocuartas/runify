import React, { FC, useEffect, useState } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../context';
import { EventModel, GetRaces } from '../utils/http';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: "🏃",
        title: "Encuentra Eventos",
        description: "Busca carreras por ubicación, distancia o fecha."
    },
    {
        icon: "🎯",
        title: "Inscripción Fácil",
        description: "Regístrate en minutos con nuestro proceso simplificado."
    },
    {
        icon: "🤝",
        title: "Comunidad Activa",
        description: "Conéctate con otros corredores y comparte experiencias."
    }
];

const Home: FC = () => {
    const [events, setEvents] = useState<EventModel[]>([]);
    const { requestLocation, location } = useGlobalState()
    const [locationRequested, setLocationRequested] = useState(false);
    useEffect(() => {
        requestLocation()
    }, [requestLocation])

    useEffect(() => {
        if (!locationRequested) {
            requestLocation();
            setLocationRequested(true);
        }
    }, [requestLocation, locationRequested]);

    useEffect(() => {
        if (!locationRequested) return;

        GetRaces({
            limit: 3,
            latitude: location?.coordinates.latitude,
            longitude: location?.coordinates.longitude,
        }).then(r => setEvents(r.data));
    }, [location?.coordinates, locationRequested]);

    return (
        <div className="space-y-16">
            <div className="relative flex items-center justify-center min-h-[35vh] md:min-h-[45vh] lg:min-h-[55vh] px-4 sm:px-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80')" }}
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-blue-600/90"></div>
                </div>
                <div className="w-full max-w-xl mx-auto relative z-10 text-white flex flex-col items-center text-center py-6 md:py-0">
                    <h1 className="text-3xl sm:text-4xl md:text-[3.5rem] font-bold mb-5 leading-tight md:leading-[1.1] drop-shadow-lg">
                        Encuentra Tu Próxima Carrera
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl opacity-90 mb-8 max-w-xl drop-shadow">
                        Explora eventos de running cerca de ti. Inscríbete fácilmente y únete a la comunidad.
                    </p>
                    <Link
                        to="/events"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 w-full sm:w-auto font-semibold text-base shadow-md"
                    >
                        Explorar Eventos
                    </Link>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-none lg:rounded-[2.5rem] overflow-hidden"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5">
                <div className="grid md:grid-cols-3 gap-8 py-16">
                    {features.map((feature: Feature, index: number) => (
                        <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition duration-300">
                            <div className="text-4xl mb-4 text-blue-600" role="img" aria-label={feature.title}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-5 max-w-[1200px] mx-auto px-5">
                <h2 className="text-center mb-8 text-gray-800 text-2xl font-semibold">
                    Próximos Eventos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    {events.map((event: EventModel) => (
                        <Card
                            key={event.id}
                            {...event}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 py-16">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Sobre Nosotros</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Somos una plataforma dedicada a conectar corredores con los mejores eventos de running. Encuentra información detallada, inscríbete y prepárate para tu próxima meta.
                        </p>
                        <Link
                            to="/about"
                            className="text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg transition duration-300 inline-block border-2 border-blue-600"
                        >
                            Saber Más →
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-5 py-16">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">¿Listo para Correr?</h2>
                    <p className="mb-8 text-lg opacity-90">
                        Regístrate hoy y no te pierdas tu próxima gran carrera. ¡Forma parte de nuestra comunidad!
                    </p>
                    <Link
                        to="/register"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
                    >
                        Regístrate Ahora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;