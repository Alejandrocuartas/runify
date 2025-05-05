import React, { useState, createContext, useContext, useCallback } from "react";
import { runnifyTokenName } from "../utils/constants";
interface LocationState {
    name: string,
    coordinates: {
        latitude: number,
        longitude: number
    }
}

interface GlobalContextType {
    user: any | null
    setUser: React.Dispatch<React.SetStateAction<any>>;
    logged: boolean
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
    location: LocationState | null
    setLocation: React.Dispatch<React.SetStateAction<LocationState | null>>;
    requestLocation: () => void;
}

const logContext = createContext<GlobalContextType>({
    setUser: () => {},
    user: null,
    logged: false,
    setLogged: () => {},
    location: null,
    setLocation: () => {},
    requestLocation: () => {}
});

const Context = ({ children }) => {
    const [logged, setLogged] = useState(localStorage.getItem(runnifyTokenName) !== null)
    const [user, setUser] = useState(null)
    const [location, setLocation] = useState<LocationState | null>(null)

    const requestLocation = useCallback(() => {
        if (location) {
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        name: "Ubicación actual",
                        coordinates: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                    });
                    console.log("Ubicación obtenida:", position.coords);
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                    setLocation(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }
    }, [location, setLocation]);

    return (
        <logContext.Provider value={{
            user,
            logged,
            setLogged,
            setUser,
            location,
            setLocation,
            requestLocation,
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };
