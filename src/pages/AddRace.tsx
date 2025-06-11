import React, { useState } from 'react';
import { CreateRace, CreateRaceRequest, SearchLocationsSmart, UploadFileToServer } from '../utils/http';
import { runnifyTokenName } from '../utils/constants';
import { useGlobalState } from '../context';
import TagInput from '../components/TagInput';

interface EventFile {
    fileName: string;
    contentType: string;
    s3Key: string;
}

interface EventData {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    priceUnit: string;
    distance: number;
    distanceUnit: string;
    type: string;
    dateTime: string;
    secondaryImagesUrls?: string[];
    coordinates: number[];
    city: string;
    amenities?: string[];

    // date and start time are taken separately but combined to create dateTime
    date: string;
    startTime: string;
    // secondary images uploaded to s3 and their urls are stored in secondaryImagesUrls
    secondaryImages?: EventFile[];
    // image uploaded to s3 and its url is stored in imageUrl
    image?: EventFile;
}

interface Location {
    name: string;
    coordinates: number[];
}

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
        distance: 0,
        distanceUnit: 'kilometers',
        price: 0,
        priceUnit: 'COP',
        city: "",
        amenities: [],
        secondaryImages: [],
        imageUrl: '',
        type: '',
        dateTime: '',
        coordinates: [],
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

    const handleAmenitiesChange = (amenities: string[]) => {
        setEventData(prev => ({
            ...prev,
            amenities: amenities
        }));
    };

    const handleRemoveSecondaryImage = (indexToRemove: number) => {
        setEventData(prev => ({
            ...prev,
            secondaryImages: prev.secondaryImages?.filter((_, index) => index !== indexToRemove),
            secondaryImagesUrls: prev.secondaryImagesUrls?.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSecondaryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setLoading(true);
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
                const newSecondaryImagesUrls = successfullyUploadedFiles.map(file => file.fileUrl);
                setEventData(prev => ({
                    ...prev,
                    secondaryImages: [...(prev.secondaryImages || []), ...successfullyUploadedFiles],
                    secondaryImagesUrls: [...(prev.secondaryImagesUrls || []), ...newSecondaryImagesUrls]
                }));

                if (successfullyUploadedFiles.length < files.length) {
                    alert(`${files.length - successfullyUploadedFiles.length} archivos secundarios no pudieron subirse.`);
                }

            } catch (error) {
                console.error("Error durante la subida de archivos secundarios múltiples:", error);
                alert("Ocurrió un error durante la subida de algunos archivos secundarios.");
            } finally {
                e.target.value = '';
                setLoading(false);
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

        const finalEventData: CreateRaceRequest = {
            title: eventData.title,
            description: eventData.description,
            imageUrl: eventData.imageUrl,
            price: eventData.price,
            priceUnit: eventData.priceUnit,
            distance: eventData.distance,
            distanceUnit: eventData.distanceUnit,
            type: eventData.type,
            date: combineDateTime(eventData.date, eventData.startTime),
            coordinates: eventData.coordinates as [number, number],
            city: eventData.city,
            amenities: eventData.amenities,
            files: eventData.secondaryImagesUrls,
        };

        try {
            console.log("Enviando datos del evento:", finalEventData);
            const result = await CreateRace(finalEventData, token);

            console.log("Evento creado con éxito:", result);
            alert("Evento creado con éxito!");
            setEventData({
                title: '',
                description: '',
                date: '',
                startTime: '',
                city: "",
                amenities: [],
                secondaryImages: [],
                imageUrl: '',
                price: 0,
                priceUnit: 'COP',
                distance: 0,
                distanceUnit: 'kilometers',
                type: '',
                dateTime: '',
                coordinates: [],
            });
        } catch (error) {
            console.error("Error en el proceso de creación del evento:", error);
            alert(`Error al crear el evento: ${error instanceof Error ? error.message : "Ocurrió un error desconocido"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (token && value.length > 0) {
            SearchLocationsSmart(value, token)
                .then(setCities)
                .catch(error => {
                    console.error("Error al buscar ciudades:", error);
                });
        } else {
            setCities([]);
        }
        setEventData(prev => ({ ...prev, city: value, coordinates: [] }));
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
                        {eventData.secondaryImages && eventData.secondaryImages.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-base font-semibold">Archivos cargados:</h3>
                                <ul className="mt-2 space-y-2">
                                    {eventData.secondaryImages.map((file, index) => (
                                        <li key={file.s3Key || index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                            <span className="text-sm font-medium text-gray-800">{file.fileName}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSecondaryImage(index)}
                                                className="ml-4 text-red-600 hover:text-red-800 text-xs font-bold"
                                            >
                                                ELIMINAR
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                placeholder="Agregar distancia (ej: 5, 10, 21)"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Unidad de Distancia (Ej: Kilómetros, Millas)</label>
                            <select
                                name="distanceUnit"
                                value={eventData.distanceUnit}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="kilometers">Kilómetros</option>
                                <option value="miles">Millas</option>
                                <option value="laps">Vueltas</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Precio</label>
                            <input
                                type="number"
                                name="price"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Moneda</label>
                            <select
                                name="priceUnit"
                                value={eventData.priceUnit}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="COP">COP</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Tipo</label>
                            <select
                                name="type"
                                value={eventData.type}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Seleccionar Tipo</option>
                                <option value="short_distance_race">Carrera de corta distancia</option>
                                <option value="medium_distance_race">Carrera de media distancia</option>
                                <option value="long_distance_race">Carrera de larga distancia</option>
                                <option value="trail_race">Carrera de trail</option>
                                <option value="tematic_or_recreational_race">Carrera tematica o recreativa</option>
                                <option value="asphalt_race">Carrera en Asfalto</option>
                                <option value="charity_race_or_race_with_a_cause">Carrera Benefica o con Causa</option>
                                <option value="obstacle_race">Carrera de Obstaculos</option>
                                <option value="individual_race">Carrera individual</option>
                                <option value="team_race">Carrera en Equpos</option>
                                <option value="race_with_a_theme">Carrera con tema</option>
                                <option value="other">Otro</option>
                            </select>
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

                    <div className="col-span-2">
                        <label className="block mb-2">Beneficios</label>
                        <TagInput
                            tags={eventData.amenities || []}
                            onTagsChange={handleAmenitiesChange}
                            placeholder="Agregar beneficio (ej: Medalla, Hidratación, Camiseta, Fruta, etc)"
                            className="w-full"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Presiona Enter para agregar cada beneficio
                        </p>
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