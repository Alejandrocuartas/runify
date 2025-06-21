import React, { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from '../components/Layout';
import { CreateRaceRegistration, GetRaces, RegistrationRequest } from '../utils/http';

interface RegistrationFormData extends RegistrationRequest {
    agreeToPrivacy: boolean;
}

// Placeholder for event data - in a real app, you might fetch event title or details
interface EventStub {
    id: number;
    title: string;
    termsUrl?: string;
    includeTshirt: boolean;
    tshirtPrice: number;
    priceUnit: string;
}

const bloodTypes = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];
const documentTypes = ['CC', 'TI', 'NIT', 'Pasaporte'];
const tshirtSizes = ['S', 'M', 'L', 'XL'];



const RaceRegistrationPage: FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventStub | null>(null);
    const [formData, setFormData] = useState<RegistrationFormData>({
        documentType: 'CC',
        documentNumber: '',
        documentCountry: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        wantsTshirt: false,
        tshirtSize: '',
        healthService: '',
        bloodType: '',
        country: '',
        department: '',
        city: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        agreeToTerms: false,
        agreeToPrivacy: false,
        eventId: 0,
    });
    const [loading, setLoading] = useState(false); // For API call simulation
    const [eventLoading, setEventLoading] = useState(true);
    const [countries, setCountries] = useState<string[]>([]);
    const [isMinor, setIsMinor] = useState(false);
    const [departments, setDepartments] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    useEffect(() => {
        if (!eventId) {
            navigate('/events');
            return;
        }
        const eventIdInt = parseInt(eventId);
        // Simulate fetching basic event info (like title) to display on the registration page
        if (eventIdInt && !isNaN(eventIdInt)) {
            setEventLoading(true);
            // Replace with actual API call if needed
            GetRaces({
                id: eventIdInt
            }).then(r => {
                setEvent({
                    id: eventIdInt,
                    title: r?.data[0]?.title,
                    termsUrl: r?.data[0]?.termsUrl,
                    includeTshirt: r?.data[0]?.includeTshirt,
                    tshirtPrice: r?.data[0]?.tshirtPrice,
                    priceUnit: r?.data[0]?.priceUnit
                });
                setEventLoading(false);
            }).catch(() => {
                setEventLoading(false);
                navigate('/events');
            });
        }
    }, [eventId, navigate]);

    useEffect(() => {
        setCountries(['Colombia']);
        return;
        // DO NOT REMOVE NEXT COMMENTED LINES
        /* fetch('https://countriesnow.space/api/v0.1/countries/states')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data?.data)) {
                    const countryNames = data.data.map((c: any) => c.name).sort();
                    setCountries(countryNames);
                } else {
                    setCountries([]);
                }
            })
            .catch(() => setCountries([])); */
    }, []);

    useEffect(() => {
        // Check if user is minor
        if (formData.birthDate) {
            const birth = new Date(formData.birthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            setIsMinor(age < 18);
        } else {
            setIsMinor(false);
        }
    }, [formData.birthDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, country: e.target.value, department: '', city: '' }));
        fetch('https://countriesnow.space/api/v0.1/countries/states', {
            method: 'POST',
            body: JSON.stringify({ country: e.target.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data?.data?.states)) {
                    const departments = data.data.states.map((c: any) => c.name);
                    setDepartments(departments);
                } else {
                    setDepartments([]);
                }
            })
            .catch(() => {
                alert('Error al obtener los departamentos');
                setDepartments([]);
            });
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, department: e.target.value.replace(' Department', ''), city: '' }));
        fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            body: JSON.stringify({ country: formData.country, state: e.target.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data?.data)) {
                    setCities(data.data);
                } else {
                    setCities([]);
                }
            })
            .catch(() => {
                alert('Error al obtener las ciudades');
                setCities([]);
            });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!event?.id) {
            alert('Error al obtener el evento');
            return;
        }
        if (event?.termsUrl && !formData.agreeToTerms) {
            alert('Debes aceptar los términos y condiciones del organizador para registrarte.');
            return;
        }
        if (!formData.agreeToPrivacy) {
            alert('Debes aceptar los términos y condiciones y la política de privacidad de Runity para registrarte.');
            return;
        }
        setLoading(true);
        try {
            await CreateRaceRegistration({
                ...formData,
                eventId: event?.id
            });
            alert(`¡Inscripción exitosa para el evento ${event?.title}! Recibirás un correo de confirmación.`);
            navigate(`/events/${eventId}`); // Navigate back to event detail page or a success page
        } catch (error) {
            console.error(error);
            alert('Error al inscribirse. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
                            <select
                                name="documentType"
                                value={formData.documentType}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                required
                            >
                                <option value="" disabled>Selecciona tipo</option>
                                {documentTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">País emisor</label>
                            <select
                                name="documentCountry"
                                value={formData.documentCountry}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                required
                            >
                                <option value="" disabled>Selecciona país</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de documento</label>
                            <input
                                type="text"
                                name="documentNumber"
                                value={formData.documentNumber}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono móvil</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {isMinor && (
                                <p className="text-xs text-yellow-600 mt-1">Si eres menor de edad, debes ir acompañado de un adulto responsable el día del evento.</p>
                            )}
                        </div>
                        {event?.includeTshirt && (
                            <div className="md:col-span-2">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="wantsTshirt"
                                            name="wantsTshirt"
                                            type="checkbox"
                                            checked={formData.wantsTshirt}
                                            onChange={handleChange}
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="wantsTshirt" className="font-medium text-gray-700">
                                            Deseo recibir la camiseta del evento ({event?.tshirtPrice ? event?.tshirtPrice + ' ' + event?.priceUnit : 'Es gratis'}).
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {formData.wantsTshirt && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Talla de camiseta</label>
                                <select
                                    name="tshirtSize"
                                    value={formData.tshirtSize}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    required={formData.wantsTshirt}
                                >
                                    <option value="" disabled>Selecciona una talla</option>
                                    {tshirtSizes.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué EPS tiene?</label>
                            <input
                                type="text"
                                name="healthService"
                                value={formData.healthService}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de sangre</label>
                            <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                required
                            >
                                <option value="" disabled>Selecciona tipo</option>
                                {bloodTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleCountryChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                required
                            >
                                <option value="" disabled>Selecciona país</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleDepartmentChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                required
                            >
                                <option value="" disabled>Selecciona departamento</option>
                                {departments.map(dep => {
                                    return <option key={dep} value={dep}>{(dep as string).replace(' Department', '')}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                required
                            >
                                <option value="" disabled>Selecciona ciudad</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de contacto de emergencia</label>
                            <input
                                type="text"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono contacto de emergencia</label>
                            <input
                                type="tel"
                                name="emergencyContactPhone"
                                value={formData.emergencyContactPhone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    {event?.termsUrl && (
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
                                    Acepto los <a href={event.termsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">términos y condiciones del organizador</a>.
                                </label>
                            </div>
                        </div>
                    )}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="agreeToPrivacy"
                                name="agreeToPrivacy"
                                type="checkbox"
                                checked={formData.agreeToPrivacy}
                                onChange={handleChange}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="agreeToPrivacy" className="font-medium text-gray-700">
                                Acepto los <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Términos y Condiciones y la Política de Privacidad</a> de Runity.
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