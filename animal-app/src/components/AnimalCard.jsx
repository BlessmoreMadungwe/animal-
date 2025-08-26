import React from 'react';

const AnimalCard = ({ animal }) => {
  if (!animal) return null; // optional safety check

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{animal.name}</h2>
      <p className="text-gray-600">{animal.description}</p>
    </div>
  );
};

export default AnimalCard;
