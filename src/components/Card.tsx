import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveCard from './ResponsiveCard';
import { EventModel } from '../utils/http';
import { distanceUnitsSymbols } from '../utils/constants';

const Card: FC<EventModel> = ({
    id,
    title,
    description,
    imageUrl,
    date,
    distance,
    price,
    city,
    distanceUnit,
    priceUnit,
}) => {
    return (
        <ResponsiveCard>
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover rounded-t-lg"
                loading="lazy"
            />
            <div className="p-4 flex flex-col space-y-2">
                <h2 className="text-lg font-semibold line-clamp-2" title={title}>
                    {title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 flex-grow" title={description}>
                    {description}
                </p>
                <div className="text-sm text-gray-500 space-y-1 pt-2">
                    <p>
                        <span role="img" aria-label="Fecha">📅</span> {new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p>
                        <span role="img" aria-label="Distancia">🏃‍♂️</span> {distance}{distanceUnitsSymbols[distanceUnit]}
                    </p>
                    {city && (
                        <p>
                            <span role="img" aria-label="Ubicación">📍</span> {city}
                        </p>
                    )}
                    {price && (
                        <p className="font-semibold text-blue-600">
                            <span role="img" aria-label="Precio">{priceUnit} 💲</span>{price}
                        </p>
                    )}
                </div>
                <Link
                    to={`/events/${id}`}
                    className="inline-block text-blue-600 hover:text-blue-700 hover:underline pt-2 self-start"
                >
                    Ver Detalles →
                </Link>
            </div>
        </ResponsiveCard>
    );
};

export default Card;