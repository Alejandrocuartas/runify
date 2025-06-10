import { servicesUrl } from "./constants";

interface ErrorDetails {
    errors?: { message: string }[];
}


const thowError = (error: ErrorDetails, statusText: string) => {
    throw new Error(error.errors?.[0]?.message || statusText);
}

const SignUp = async (data: any = {}): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
    };

    const response = await fetch(servicesUrl + "/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        thowError(errorDetails, response.statusText);
    }

    return response.json();
};

const SignIn = async (data: any = {}): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
    };

    const response = await fetch(servicesUrl + "/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        thowError(errorDetails, response.statusText);
    }

    return response.json();
};

interface Location {
    name: string;
    coordinates: [number, number];
}

/**
 * Realiza una búsqueda de ubicaciones solo si el término de búsqueda para la ciudad
 * cumple con una longitud mínima. Esto ayuda a reducir llamadas innecesarias a la API
 * para entradas muy cortas.
 *
 * @param city El nombre de la ciudad a buscar.
 * @param token Token de autenticación opcional.
 * @returns Una promesa que se resuelve con un array de ubicaciones.
 *          Si el término de búsqueda es demasiado corto, se resuelve con un array vacío
 *          sin realizar una llamada a la API.
 */
const SearchLocationsSmart = async (city: string, token?: string): Promise<Location[]> => {
    if (!city || city.trim().length < 0) {
        // La consulta es demasiado corta, devuelve un array vacío inmediatamente.
        // Esto evita una llamada innecesaria a la API.
        return Promise.resolve([]);
    }
    // Si la consulta es lo suficientemente larga, procede con la llamada a la API
    // utilizando la función original SearchLocations.
    return SearchLocations(city, token);
};

const SearchLocations = async (city: string, token?: string): Promise<Location[]> => {

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(servicesUrl + `/api/v1/locations?name=${city}`, {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        thowError(errorDetails, response.statusText);
    }

    return response.json();
};

export interface CreateRaceRequest {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    priceUnit: string;
    distance: number;
    distanceUnit: string;
    type: string;
    date: string; // 06-10-2025T10:00:00Z
    files?: string[];
    coordinates: [number, number];
    city: string;
    amenities?: string[];
}

const CreateRace = async (data: CreateRaceRequest, token?: string): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(servicesUrl + "/api/v1/events", {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        thowError(errorDetails, response.statusText);
    }

    return response.json();
};

const RegisterToRace = async (raceId: string, data: any = {}, token?: string): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(servicesUrl + `/a/api/v1/races/${raceId}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        thowError(errorDetails, response.statusText);
    }

    return response.json();
};

interface GenerateUploadUrlRequest {
    fileName: string;
    contentType: string;
}

interface GenerateUploadUrlResponse {
    uploadUrl: string;
    s3Key: string;
}

interface ConfirmUploadRequest {
    fileName: string;
    contentType: string;
    s3Key: string;
}

const UploadFileToServer = async (file: File, jwt: string | null): Promise<any> => {
    if (!jwt) {
        throw new Error("No token provided");
    }

    const fileName = file.name;
    const contentType = file.type;

    // Step 1: Generate S3 presigned URL
    const generateUrlPayload: GenerateUploadUrlRequest = { fileName, contentType };
    const presignResponse = await fetch(`${servicesUrl}/api/v1/files/generate-upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify(generateUrlPayload),
    });

    if (!presignResponse.ok) {
        const errorData = await presignResponse.json().catch(() => ({ message: 'Error desconocido al generar URL' }));
        throw new Error(errorData.message || `Error al generar URL para ${fileName}`);
    }
    const { uploadUrl, s3Key }: GenerateUploadUrlResponse = await presignResponse.json();

    // Step 2: Upload file to S3
    const s3UploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': contentType },
        body: file,
    });

    if (!s3UploadResponse.ok) {
        throw new Error(`Error al subir ${fileName} a S3 (status: ${s3UploadResponse.status})`);
    }

    // Step 3: Confirm upload
    const confirmUploadPayload: ConfirmUploadRequest = { fileName, contentType, s3Key };
    const confirmResponse = await fetch(`${servicesUrl}/api/v1/files/confirm-upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify(confirmUploadPayload),
    });

    if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json().catch(() => ({ message: 'Error desconocido al confirmar subida' }));
        throw new Error(errorData.message || `Error al confirmar subida para ${fileName}`);
    }

    const { file: fileUrl }: { file: string } = await confirmResponse.json();

    return { fileName, contentType, s3Key, fileUrl };
};

export {
    SignUp,
    SignIn,
    CreateRace,
    RegisterToRace,
    SearchLocations,
    UploadFileToServer,
    SearchLocationsSmart,
};