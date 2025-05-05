import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from "../utils/http";
import { runnifyTokenName } from '../utils/constants';

interface FormData {
    email: string;
    password: string;
}

const Login: FC = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { email, password } = formData;

        setLoading(true);

        try {
            const response = await SignIn({ email, password });
            setLoading(false);

            if (!response.token) {
                throw new Error("Error de autenticación");
            }

            localStorage.setItem(runnifyTokenName, response.token);

            window.location.href = "/runner-dashboard";

        } catch (error: any) {
            setLoading(false);
            alert(error.message || "Credenciales incorrectas");
            console.error(error);
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {
                        loading ?
                            "Cargando..." :
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Iniciar Sesión
                            </button>
                    }

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-500">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;