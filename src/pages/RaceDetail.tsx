import React, { useState} from 'react';



interface Race {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    distance: string;
    type: string;
    price: string;
    description: string;
    status: string;
    organizer: string;
    maxParticipants: number;
    currentParticipants: number;
    route: string;
    requirements: string[];
    amenities: string[];
}

const RaceDetail = () => {

    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const race: Race = {
        id: 1,
        title: "Maratón de la Ciudad 2024",
        date: "2024-03-15",
        time: "07:00 AM",
        location: "Parque Central",
        distance: "42km",
        type: "maratón",
        price: "50.00",
        description: "¡Únete a nuestra maratón anual! Perfecta para principiantes y corredores experimentados.",
        status: "publicado",
        organizer: "Club de Corredores de la Ciudad",
        maxParticipants: 1000,
        currentParticipants: 456,
        route: "https://maps.example.com/route",
        requirements: [
            "Edad mínima: 18 años",
            "Certificado médico requerido",
            "Experiencia en running recomendada"
        ],
        amenities: [
            "Estaciones de agua cada 5km",
            "Soporte médico",
            "Almacenamiento de bolsas",
            "Medalla de finalización",
            "Refrigerios post-carrera"
        ]
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registro enviado');
        setShowRegisterModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{race.title}</h1>
                        <p className="text-gray-600 mb-4">Organizado por {race.organizer}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${race.status === 'publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {race.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Fecha</p>
                        <p className="font-semibold">{race.date}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Hora</p>
                        <p className="font-semibold">{race.time}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Distancia</p>
                        <p className="font-semibold">{race.distance}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Precio</p>
                        <p className="font-semibold">${race.price}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Sobre la Carrera</h2>
                        <p className="text-gray-600">{race.description}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Requisitos</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {race.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Servicios</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {race.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Registro</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Plazas disponibles</span>
                                <span className="font-semibold">
                                    {race.maxParticipants - race.currentParticipants} / {race.maxParticipants}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${(race.currentParticipants / race.maxParticipants) * 100}%` }}
                                ></div>
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
                                onClick={() => setShowRegisterModal(true)}
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
                        <p className="text-gray-600 mb-4">{race.location}</p>
                        <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">El mapa se mostrará aquí</p>
                        </div>
                    </div>
                </div>
            </div>

            {showRegisterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Regístrate para {race.title}</h2>

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <h3 className="font-medium mb-2">Detalles del Registro</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Nombre del Contacto de Emergencia
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Teléfono del Contacto de Emergencia
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">
                                            Talla de Camiseta
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Seleccionar talla</option>
                                            <option value="XS">XS</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        required
                                        className="rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Acepto los términos y condiciones
                                    </span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        required
                                        className="rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Confirmo que cumplo con todos los requisitos de la carrera
                                    </span>
                                </label>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <span>Cuota de Inscripción</span>
                                    <span>${race.price}</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${race.price}</span>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowRegisterModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Confirmar Registro
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RaceDetail;