import React, { useState } from 'react';
import { SearchLocations } from '../utils/http';
import { runnifyTokenName } from '../utils/constants';


interface EventData {
    title: string;
    description: string;
    date: string;
    startTime: string;
    subType: string;
    price: number;
    maxParticipants: number;
    distanceUnit: string;
    city: string;
    distance: number;
    amenities?: string[];
    coordinates?: number[];
}

interface Location {
    name: string;
    coordinates: number[];
}

const getTypeBySubType = (subType: string): string | undefined => {
    const typeRace = "race";

    if (subType === "marathon") {
        return typeRace;
    }

    if (subType === "trail") {
        return typeRace;
    }

    if (subType === "fun-run") {
        return typeRace;
    }

    return undefined; // Consider returning undefined if no match is found
};

const combineDateTime = (dateStr: string, timeStr: string): string => {
    const date = new Date(`${dateStr}T${timeStr}:00Z`);
    return date.toISOString();
};

const AddRace = () => {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<Location[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [eventData, setEventData] = useState<EventData>({
        title: '',
        description: '',
        date: '',
        startTime: '',
        subType: '',
        price: 0,
        maxParticipants: 0,
        distanceUnit: '',
        city: "",
        distance: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let newValue: unknown = value;
        if (type === "number") {
            newValue = Number(value);
        }
        setEventData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (eventData[name] === 0) {
            setEventData((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value === "") {
            setEventData((prev) => ({
                ...prev,
                [name]: 0,
            }));
        }
    };

    const [imageFile, setImageFile] = useState <File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImageFile(file);
    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values: string[] = Array.from(e.target.selectedOptions, option => option.value);
        setEventData(prev => ({
            ...prev,
            amenities: values
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem(runnifyTokenName);

        if (!token) {
            alert("Debes iniciar sesión para crear un evento");
            return;
        }

        const data = {
            ...eventData,
            date: combineDateTime(eventData.date, eventData.startTime),
            type: getTypeBySubType(eventData.subType),
            priceUnit: "COP",
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (imageFile) {
            formData.append("file", imageFile);
        }

        try {
            setLoading(true);

            // const response = await CreateRace(data, token);

            // } catch (error) {
            //   setLoading(false);
            //   alert("Error saving event");
            //   console.log(error);
            // }

            const response = await fetch("https://tu-api.com/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir token si es necesario
                },
                body: formData, // Enviamos FormData
            });

            const result = await response.json();
            console.log("Evento creado con éxito:", result);

        } catch (error) {
            console.error("Error al crear el evento:", error);
            alert("Error al guardar el evento");

        } finally {
            setLoading(false);
        }

    };

    const handleChangeLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const token = localStorage.getItem(runnifyTokenName);
        if (token) {
            const locations = await SearchLocations(value, token);
            setCities(locations);
        }
    };

    const handleSelectCity = (city: Location) => {
        setEventData(prev => ({ ...prev, city: city.name, coordinates: city.coordinates }));
        setShowDropdown(false);
    };

    return (
        <div className="max-w-[800px] mx-auto px-5 py-8">
            <h1 className="text-2xl font-bold mb-6">Añadir Carrera</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Información Básica</h2>

                    <div>
                        <label className="block mb-2">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows={4}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Imagen</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Detalles del Evento</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Fecha</label>
                            <input
                                type="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Hora de Inicio</label>
                            <input
                                type="time"
                                name="startTime"
                                value={eventData.startTime}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Distancia</label>
                            <input
                                type="number"
                                name="distance"
                                value={eventData.distance}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="w-full p-2 border rounded"
                                min="1"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Unidad de Distancia</label>
                            <select
                                name="distanceUnit"
                                value={eventData.distanceUnit}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Seleccionar Unidad</option>
                                <option value="kilometers">Kilómetros</option>
                                <option value="miles">Millas</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Tipo</label>
                            <select
                                name="subType"
                                value={eventData.subType}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Seleccionar Tipo</option>
                                <option value="marathon">Maratón</option>
                                <option value="trail">Trail</option>
                                <option value="fun-run">Carrera Divertida</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Precio</label>
                            <input
                                type="number"
                                name="price"
                                value={eventData.price}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="w-full p-2 border rounded"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2">Máximo de Participantes</label>
                            <input
                                type="number"
                                name="maxParticipants"
                                value={eventData.maxParticipants}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="w-full p-2 border rounded"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* City Search Input */}
                    <div className="relative">
                        <label className="block mb-2">Ciudad</label>
                        <input
                            type="text"
                            name="city"
                            value={eventData.city}
                            onChange={handleChangeLocation}
                            onFocus={() => setShowDropdown(true)}
                            className="w-full p-2 border rounded"
                            placeholder="Buscar ciudad..."
                            required
                        />
                        {showDropdown && cities.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-y-auto">
                                {cities.map((city) => (
                                    <li
                                        key={city.name}
                                        onClick={() => handleSelectCity(city)}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block mb-2">Servicios</label>
                        <select
                            multiple
                            name="amenities"
                            onChange={handleAmenitiesChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Estaciones de Agua">Estaciones de Agua</option>
                            <option value="Soporte Médico">Soporte Médico</option>
                            <option value="Medalla de Finalización">Medalla de Finalización</option>
                            <option value="Camiseta">Camiseta</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded text-white flex justify-center items-center transition 
                ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                                    ></path>
                                </svg>
                                Cargando...
                            </>
                        ) : (
                            "Crear Evento"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRace;