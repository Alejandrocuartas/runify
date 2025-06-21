import React, { useState } from "react";
import { EventModel, UploadFileToServer } from "../utils/http";
import TagInput from "./TagInput";
import { useGlobalState } from "../context";


const EditEventModal = ({ event, onClose, onSave }: { event: EventModel; onClose: () => void; onSave: (updatedEvent: EventModel) => void }) => {
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState<EventModel>(event);
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


    const handleAmenitiesChange = (amenities: string[]) => {
        setEventData(prev => ({
            ...prev,
            amenities: amenities
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Aquí iría la llamada real a la API
            // await api.put(`/events/${event.id}`, eventData);
            onSave(eventData);
            onClose();
        } catch (error) {
            console.error('Error al actualizar evento:', error);
            alert('Error al actualizar el evento');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setLoading(true);
            try {
                console.log("Subiendo imagen principal...");
                const uploadedImage = await UploadFileToServer(file, token);
                console.log("uploadedImage", uploadedImage);
                setEventData(prev => ({ ...prev, imageUrl: uploadedImage.fileUrl }));
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

    const handleRemoveSecondaryImage = (indexToRemove: number) => {
        setEventData(prev => ({
            ...prev,
            files: prev.files?.filter((_, index) => index !== indexToRemove),
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
                    files: [...(prev.files || []), ...newSecondaryImagesUrls],
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

    const handleTermsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setLoading(true);
            try {
                console.log("Subiendo terminos y condiciones...");
                const uploadedFile = await UploadFileToServer(file, token);
                setEventData(prev => ({ ...prev, termsUrl: uploadedFile.fileUrl }));
                console.log("Terminos y condiciones subidos:", uploadedFile);
            } catch (error) {
                console.error("Error al subir terminos y condiciones:", error);
                alert(`Error al subir terminos y condiciones: ${error instanceof Error ? error.message : "Error desconocido"}`);
                e.target.value = '';
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Editar Evento</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Información Básica</h3>

                            <div>
                                <label className="block mb-2">Título</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={eventData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
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
                                {eventData.files && eventData.files.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-base font-semibold">Archivos cargados:</h3>
                                        <ul className="mt-2 space-y-2">
                                            {eventData.files.map((file, index) => (
                                                <li key={file} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                                    <a href={file} target="_blank" rel="noopener noreferrer">
                                                        <span className="text-sm font-medium text-blue-500 hover:text-blue-700">{`file ${index + 1}`}</span>
                                                    </a>
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

                            <div>
                                <label className="block mb-2">Términos y condiciones (PDF)</label>
                                <input
                                    type="file"
                                    name="termsUrl"
                                    accept=".pdf"
                                    onChange={handleTermsUpload}
                                    className="w-full p-2 border rounded"
                                />
                                {eventData.termsUrl && (
                                    <div className="mt-2">
                                        <a href={eventData.termsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Ver PDF cargado
                                        </a>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Detalles del Evento</h3>

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
                                        value={eventData.date.split('T')[1]}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Distancias</label>
                                    <TagInput
                                        tags={[]}
                                        onTagsChange={() => { }}
                                        placeholder="Agregar distancia (ej: 5k, 10k, 21k)"
                                        className="w-full"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Precios por Distancia</label>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4">
                                            <span className="w-24">{eventData.distance}</span>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={eventData.price.toLocaleString()}
                                                onChange={(e) => handleChange(e)}
                                                name="price"
                                                className="flex-1 p-2 border rounded"
                                                placeholder="Ingrese el precio"
                                                required
                                            />
                                            <span className="text-gray-500">COP</span>
                                        </div>
                                    </div>
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
                                        value={eventData.type}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">Seleccionar Tipo</option>
                                        <option value="Short distance race">Carrera de corta distancia</option>
                                        <option value="Medium distance race">Carrera de media distancia</option>
                                        <option value="Long distance race">Carrera de larga distancia</option>
                                        <option value="Trail race">Carrera de trail</option>
                                        <option value="Tematic or recreational race">Carrera tematica o recreativa</option>
                                        <option value="Asphalt race">Carrera en Asfalto</option>
                                        <option value="Charity race or race with a cause">Carrera Benefica o con Causa</option>
                                        <option value="Obstacle race">Carrera de Obstaculos</option>
                                        <option value="Individual race">Carrera individual</option>
                                        <option value="Team race">Carrera en Equpos</option>
                                        <option value="Race with a theme">Carrera con tema</option>
                                        <option value="others">Otros</option>
                                    </select>
                                    {eventData.type === 'others' && (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="customSubType"
                                                value={eventData.type}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                                placeholder="Especifique el tipo de carrera"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2">Beneficios</label>
                                    <TagInput
                                        tags={eventData.amenities || []}
                                        onTagsChange={handleAmenitiesChange}
                                        placeholder="Agregar beneficio (ej: Medalla, Hidratación, Camiseta)"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEventModal;