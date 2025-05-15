import React, { useState } from 'react';
import { SearchLocationsSmart, UploadFileToServer } from '../utils/http';
import { runnifyTokenName } from '../utils/constants';
import { useGlobalState } from '../context';

interface EventFile {
    fileName: string;
    contentType: string;
    s3Key: string;
}

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
    secondaryImages?: EventFile[];
    image?: EventFile;
    files?: EventFile[];
    type?: string;
    priceUnit?: string;
    imageUrl?: string;
    secondaryImagesUrls?: string[];
}

interface Location {
    name: string;
    coordinates: number[];
}

const getTypeBySubType = (subType: string): string | undefined => {
    const typeRace = "race";
    if (subType === "marathon" || subType === "trail" || subType === "fun-run") {
        return typeRace;
    }
    return undefined;
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
        amenities: [],
        secondaryImages: [],
        image: undefined,
    });

    const { token } = useGlobalState();

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
        if (eventData[name as keyof EventData] === 0) {
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setLoading(true);
            try {
                console.log("Subiendo imagen principal...");
                const uploadedImage = await UploadFileToServer(file, token);
                setEventData(prev => ({ ...prev, image: uploadedImage, imageUrl: uploadedImage.fileUrl }));
                console.log("Imagen principal subida:", uploadedImage);
            } catch (error) {
                console.error("Error al subir imagen principal:", error);
                alert(`Error al subir imagen principal: ${error instanceof Error ? error.message : "Error desconocido"}`);
                e.target.value = '';
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values: string[] = Array.from(e.target.selectedOptions, option => option.value);
        setEventData(prev => ({
            ...prev,
            amenities: values
        }));
    };

    const handleSecondaryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setLoading(true);
            const currentSecondaryImages = eventData.secondaryImages ? [...eventData.secondaryImages] : [];
            const uploadPromises = files.map(file => 
                UploadFileToServer(file, token).then(uploadedFile => {
                    return uploadedFile;
                }).catch(error => {
                    console.error(`Error al subir archivo secundario ${file.name}:`, error);
                    alert(`Error al subir ${file.name}: ${error instanceof Error ? error.message : "Error desconocido"}`);
                    return null;
                })
            );

            try {
                const results = await Promise.all(uploadPromises);
                const successfullyUploadedFiles = results.filter(result => result !== null) as any[];
                const secondaryImagesUrls = successfullyUploadedFiles.map(file => file.fileUrl);
                setEventData(prev => ({
                    ...prev,
                    secondaryImages: [...currentSecondaryImages, ...successfullyUploadedFiles],
                    secondaryImagesUrls: secondaryImagesUrls
                }));
                
                if (successfullyUploadedFiles.length > 0) {
                    alert(`${successfullyUploadedFiles.length} de ${files.length} archivos secundarios subidos con éxito.`);
                }
                if (successfullyUploadedFiles.length < files.length) {
                    alert(`${files.length - successfullyUploadedFiles.length} archivos secundarios no pudieron subirse.`);
                }

            } catch (error) {
                console.error("Error durante la subida de archivos secundarios múltiples:", error);
                alert("Ocurrió un error durante la subida de algunos archivos secundarios.");
            } finally {
                e.target.value = '';
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem(runnifyTokenName);
        if (!token) {
            alert("Debes iniciar sesión para crear un evento");
            setLoading(false);
            return;
        }

        const finalEventData: EventData = {
            ...eventData,
            date: combineDateTime(eventData.date, eventData.startTime),
            type: getTypeBySubType(eventData.subType),
            priceUnit: "COP",
        };

        if (!finalEventData.city) {
            delete finalEventData.coordinates;
        }
        
        if (finalEventData.files === undefined || (Array.isArray(finalEventData.files) && finalEventData.files.length === 0)) {
            delete finalEventData.files;
        }

        try {
            console.log("Enviando datos del evento:", finalEventData);
            const response = await fetch("https://tu-api.com/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(finalEventData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(()=> ({message: "Error al crear el evento"}));
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            const result = await response.json();
            console.log("Evento creado con éxito:", result);
            alert("Evento creado con éxito!");
            setEventData({
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
                amenities: [],
                secondaryImages: [],
                image: undefined,
            });
        } catch (error) {
            console.error("Error en el proceso de creación del evento:", error);
            alert(`Error al crear el evento: ${error instanceof Error ? error.message : "Ocurrió un error desconocido"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (token && value.length > 2) {
            try {
                const locations = await SearchLocationsSmart(value, token);
                setCities(locations);
            } catch (error) {
                console.error("Error al buscar ciudades:", error);
            } 
        } else {
            setCities([]);
        }
        setEventData(prev => ({ ...prev, city: value, coordinates: undefined }));
        setShowDropdown(true);
    };

    const handleSelectCity = (city: Location) => {
        setEventData(prev => ({ ...prev, city: city.name, coordinates: city.coordinates }));
        setShowDropdown(false);
        setCities([]);
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
                        <label htmlFor="image" className="block mb-2">Portada</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="secondaryImages" className="block mb-2">
                            Fotos y Videos (Opcional)
                        </label>
                        <input
                            id="secondaryImages"
                            name="secondaryImages"
                            type="file"
                            accept="image/*, video/*"
                            multiple
                            onChange={handleSecondaryImagesUpload}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Detalles del Evento</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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