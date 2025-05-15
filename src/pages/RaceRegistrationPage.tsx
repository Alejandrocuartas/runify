import React, { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from '../components/Layout';

interface RegistrationFormData {
    fullName: string;
    email: string;
    phone: string;
    tshirtSize: 'S' | 'M' | 'L' | 'XL' | '';
    agreeToTerms: boolean;
}

// Placeholder for event data - in a real app, you might fetch event title or details
interface EventStub {
    id: string;
    title: string;
}

const RaceRegistrationPage: FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventStub | null>(null);
    const [formData, setFormData] = useState<RegistrationFormData>({
        fullName: '',
        email: '',
        phone: '',
        tshirtSize: '',
        agreeToTerms: false,
    });
    const [loading, setLoading] = useState(false); // For API call simulation
    const [eventLoading, setEventLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching basic event info (like title) to display on the registration page
        if (eventId) {
            setEventLoading(true);
            // Replace with actual API call if needed
            setTimeout(() => {
                setEvent({ id: eventId, title: `Inscripción para Evento ${eventId}` });
                setEventLoading(false);
            }, 500);
        } else {
            // Handle case where eventId is not present, maybe redirect or show error
            navigate('/events'); 
        }
    }, [eventId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            alert('Debes aceptar los términos y condiciones para registrarte.');
            return;
        }
        setLoading(true);
        console.log('Form data submitted:', { eventId, ...formData });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        alert(`¡Inscripción exitosa para el evento ${event?.title}! Recibirás un correo de confirmación.`);
        navigate(`/events/${eventId}`); // Navigate back to event detail page or a success page
    };

    if (eventLoading) {
        return (
            <ResponsiveContainer>
                <div className="text-center py-20">Cargando información del evento...</div>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer className="py-8 md:py-12">
            <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Inscripción al Evento
                </h1>
                {event && <p className="text-gray-600 mb-6 text-lg">Estás inscribiéndote en: <span className='font-semibold'>{event.title}</span></p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            id="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Número de Teléfono</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            id="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required 
                        />
                    </div>

                    <div>
                        <label htmlFor="tshirtSize" className="block text-sm font-medium text-gray-700 mb-1">Talla de Camiseta</label>
                        <select 
                            name="tshirtSize" 
                            id="tshirtSize" 
                            value={formData.tshirtSize} 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            required
                        >
                            <option value="" disabled>Selecciona una talla</option>
                            <option value="S">Pequeña (S)</option>
                            <option value="M">Mediana (M)</option>
                            <option value="L">Grande (L)</option>
                            <option value="XL">Extra Grande (XL)</option>
                        </select>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input 
                                id="agreeToTerms" 
                                name="agreeToTerms" 
                                type="checkbox" 
                                checked={formData.agreeToTerms} 
                                onChange={handleChange} 
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
Acepto los <a href="/terms" target="_blank" className="text-blue-600 hover:underline">términos y condiciones</a> de la carrera.
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition-colors ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {loading ? 'Procesando Inscripción...' : 'Inscribirme'}
                    </button>
                </form>
            </div>
        </ResponsiveContainer>
    );
};

export default RaceRegistrationPage; 