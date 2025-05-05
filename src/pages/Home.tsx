import React, { FC } from 'react';
import Card from '../components/Card';
// Import CardProps from the Card component file is the best practice:
// import Card, { CardProps } from '../components/Card';
import { Link } from 'react-router-dom';

// Define the structure for a running event item
interface RunningEvent {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  distance: string;
}


// Define the structure for a feature item - now with direct text
interface Feature {
  icon: string;
  title: string; // Changed from titleKey
  description: string; // Changed from descriptionKey
}

// Features data with Spanish text
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

// Define the Home component using Arrow Function and FC type
const Home: FC = () => {
    const runningEvents: RunningEvent[] = [
        {
            id: 1,
            title: "Maratón de la Ciudad",
            description: "Corre por las calles principales en nuestro evento anual.",
            imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=500",
            date: "Marzo 15, 2024",
            distance: "42km"
        },
        {
            id: 2,
            title: "Trail Nocturno",
            description: "Una aventura bajo las estrellas en senderos desafiantes.",
            imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500",
            date: "Abril 5, 2024",
            distance: "15km"
        },
        {
            id: 3,
            title: "Carrera Playera",
            description: "Disfruta del sol y la arena en esta carrera divertida.",
            imageUrl: "https://images.unsplash.com/photo-1538583297924-3cd1cacc7f17?w=500",
            date: "Mayo 20, 2024",
            distance: "10km"
        }
    ];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative h-[80vh] flex items-center rounded-[2.5rem] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80')" }}
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-blue-600/90"></div>

                </div>
                <div className="max-w-[1200px] mx-auto px-5 relative z-10 text-white">
                    <h1 className="text-4xl md:text-[3.5rem] font-bold mb-6 leading-tight">
                        Encuentra Tu Próxima Carrera
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl">
                        Explora eventos de running cerca de ti. Inscríbete fácilmente y únete a la comunidad.
                    </p>
                    <Link
                        to="/events"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
                    >
                        Explorar Eventos
                    </Link>
                </div>
            </div>

            {/* Features Section */}
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

            {/* Upcoming Events Section */}
            <div className="py-5 max-w-[1200px] mx-auto px-5">
                <h2 className="text-center mb-8 text-gray-800 text-2xl font-semibold">
                    Próximos Eventos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    {runningEvents.map((event: RunningEvent) => (
                        <Card
                            key={event.id}
                            {...event}
                        />
                    ))}
                </div>
            </div>

            {/* About Section */}
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

            {/* CTA Section */}
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