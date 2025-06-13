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
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 md:h-56 object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-4 md:p-5 flex flex-col space-y-3">
                <h2 className="text-lg font-semibold line-clamp-2 text-gray-900" title={title}>
                    {title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 flex-grow" title={description}>
                    {description}
                </p>
                <div className="text-sm text-gray-500 space-y-2 pt-2">
                    <p className="flex items-center gap-2">
                        <span role="img" aria-label="Fecha">📅</span>
                        <span>{new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <span role="img" aria-label="Distancia">🏃‍♂️</span>
                        <span>{distance}{distanceUnitsSymbols[distanceUnit]}</span>
                    </p>
                    {city && (
                        <p className="flex items-center gap-2">
                            <span role="img" aria-label="Ubicación">📍</span>
                            <span>{city}</span>
                        </p>
                    )}
                    {price && (
                        <p className="flex items-center gap-2 font-semibold text-blue-600">
                            <span role="img" aria-label="Precio">{priceUnit} 💲</span>
                            <span>{price}</span>
                        </p>
                    )}
                </div>
                <Link
                    to={`/events/${id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 hover:underline pt-2 self-start"
                >
                    Ver Detalles
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </ResponsiveCard>
    );
};

export default Card;