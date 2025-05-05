import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveCard from './ResponsiveCard';

interface CardProps {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    distance: string;
    location?: string;
    price?: string;
}

const Card: FC<CardProps> = ({
    id,
    title,
    description,
    imageUrl,
    date,
    distance,
    location,
    price
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
                        <span role="img" aria-label="Fecha">📅</span> {date}
                    </p>
                    <p>
                        <span role="img" aria-label="Distancia">🏃‍♂️</span> {distance}
                    </p>
                    {location && (
                        <p>
                            <span role="img" aria-label="Ubicación">📍</span> {location}
                        </p>
                    )}
                    {price && (
                        <p className="font-semibold text-blue-600">
                            <span role="img" aria-label="Precio">💲</span> {price}
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

export type { CardProps };
export default Card;