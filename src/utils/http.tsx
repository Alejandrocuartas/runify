import { servicesUrl } from "./constants";

interface ErrorDetails {
    message?: string;
}

const SignUp = async (data: any = {}): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
    };

    const response = await fetch(servicesUrl + "/a/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        throw new Error(errorDetails.message || response.statusText);
    }

    return response.json();
};

const SignIn = async (data: any = {}): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
    };

    const response = await fetch(servicesUrl + "/a/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        throw new Error(errorDetails.message || response.statusText);
    }

    return response.json();
};

interface Location {
    name: string;
    coordinates: [number, number];
}

const SearchLocations = async (city: string, token?: string): Promise<Location[]> => {
    return [
        {
            name: "Buga",
            coordinates: [-99.127624, 19.419719],
        },
        {
            name: "San Jose",
            coordinates: [-99.127624, 19.419719],
        }
    ];

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(servicesUrl + `/l/api/v1/locations?name=${city}`, {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        throw new Error(errorDetails.message || response.statusText);
    }

    return response.json();
};

const CreateRace = async (data: any = {}, token?: string): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(servicesUrl + "/e/api/v1/events", {
        method: "POST",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        throw new Error(errorDetails.message || response.statusText);
    }

    return response.json();
};

const UpdateRace = async (raceId: string, data: any = {}, token?: string): Promise<any> => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(servicesUrl + `/a/api/v1/update-race/${raceId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers,
    });

    if (!response.ok) {
        const errorDetails: ErrorDetails = await response.json();
        throw new Error(errorDetails.message || response.statusText);
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
        throw new Error(errorDetails.message || response.statusText);
    }

    return response.json();
};

export {
    SignUp,
    SignIn,
    CreateRace,
    UpdateRace,
    RegisterToRace,
    SearchLocations,
};