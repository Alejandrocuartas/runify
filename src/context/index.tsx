import React, { useState, createContext, useContext, useCallback, useEffect } from "react";
import { runnifyTokenName } from "../utils/constants";
import { GetUser, UserModel } from "../utils/http";
interface LocationState {
    name: string,
    coordinates: {
        latitude: number,
        longitude: number
    }
}

interface GlobalContextType {
    user: UserModel | null
    setUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
    logged: boolean
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
    location: LocationState | null
    setLocation: React.Dispatch<React.SetStateAction<LocationState | null>>;
    requestLocation: () => void;
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const logContext = createContext<GlobalContextType>({
    setUser: () => { },
    user: null,
    logged: false,
    setLogged: () => { },
    location: null,
    setLocation: () => { },
    requestLocation: () => { },
    token: null,
    setToken: () => { }
});

const Context = ({ children }) => {
    const [logged, setLogged] = useState(localStorage.getItem(runnifyTokenName) !== null)
    const [user, setUser] = useState<UserModel | null>(null)
    const [location, setLocation] = useState<LocationState | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem(runnifyTokenName))

    useEffect(() => {
        if (logged) {
            const fetchUser = async () => {
                const user = await GetUser(token as string);
                setUser(user);
            }
            fetchUser();
        }
    }, [logged, token, setUser]);

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
            token,
            setToken
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };
